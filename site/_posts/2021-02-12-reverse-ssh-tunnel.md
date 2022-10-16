---
title: Reverse SSH tunnel for monitoring servers
date: 2021-08-16 22:54
summary: >
   How to set up a reverse SSH tunnel to external servers without risking security.
tags:
  - linux
  - ssh
categories: guide
---

A reverse SSH tunnel can be used for securely keeping a connection open to a remote server, even if it does not have a fixed IP. The only requirement is that you have a separate server that you administer which you know the IP of, or which has a domain that points to it.

### Schematic figure:

```
          Remote server           Local server
          Unknown IP              Reachable at domain example.com
          -------------           ------------

AutoSSH, reverse tunnel
that keps open to local  =======> SSH daemon
server (example.com), 
and restarts if it fails

                                  On demand SSH to remote server
              Connected! <==SSH== by connecting to local server,
                                  and connecting through the tunnel
```

# On the local server
Begin by setting up the local server. It will need a dedicated user that only is allowed to open tunnels on a specific port, and also the public key that shall be allowed to connect to the server.

## SSH daemon config
1. First create a separate user called e.g. *tunnel-user*
2. Configure the SSH daemon to only allow *that* user to create reverse SSH tunnels on specific ports (4567 in the example below):

```ssh
## /etc/ssh/sshd_config

Match User tunnel-user
        AllowAgentForwarding no
        PasswordAuthentication no
        X11Forwarding no
        GatewayPorts no
        PermitTunnel no
        ForceCommand echo 'This account can only be used for reverse-ssh'
        AllowStreamLocalForwarding no
        AllowTcpForwarding remote
        PermitOpen localhost:4567
        # Don't think these make any difference
        ClientAliveInterval 10
        ClientAliveCountMax 300
```

## Public key
Add a public key that shall be allowed to connect to the local server. This assumes that you have already copied the key to the server to a file *remote_key.id_rsa.pub*:

```bash
# On the local server, if it is already copied to the file system
(local) $ su tunnel-user
(local) $ cat remote_key.id_rsa.pub >> ~/.ssh/authorized_keys
```

## SSH configuration
This is just a nice feature that I like to use. Instead of setting all of the parameters in the SSH command, they can be specified as targets, called *Hosts*. Each target has a combination of parameters, like what `ip:port` to connect to, what SSH key to use, etc. 

```ssh
## ~/.ssh/config

# The name of the target becomes my-tunnel
Host my-tunnel
    # What to connect to (domain and username)
    Hostname      example.com
    User          tunnel-user
    # The external port on the local server
    Port          22

    # The SSH key that has been added to the local server
    IdentityFile  ~/.ssh/reverse_ssh_example.id_rsa
    # Do not try password authentication
    IdentitiesOnly yes

    # The port on the local server that is used for initiating the connection (4567), and
    # the destination when connecting to that port (localhost:22)
    RemoteForward 4567 localhost:22

    # TTY is disabled for the port
    RequestTTY no

    # To make sure that it restarts within reasonable time
    ServerAliveInterval 60
    ServerAliveCountMax 30

    # This makes sure that AutoSSH can retry the connection
    ExitOnForwardFailure yes
```

One can then connect to the target with all of the preconfigured settings, by just specifying the name:

```bash
(remote) $ ssh -N my-tunnel
# Equivalent to
(remote) $ ssh -N -p 22 -i ~/.ssh/reverse_ssh_example.id_rsa -o IdentitiesOnly=yes -R 4567:localhost:22 -T -o ServerAliveInterval=60 -o ServerAliveCountMax 30 -o ExitOnForwardFailure=yes tunnel-user@example.com
```

Note that we still needed the `-N` option since it is [not settable in the SSH config file](https://superuser.com/questions/518888/setup-n-parameter-in-ssh-config-file). It makes sure that we do try not execute a remote command (like starting a terminal) since we have disallowed it in the SSH server configuration.

# On the remote server

## Service that starts the reverse SSH tunnel
Create a service on the remote server that continously tries to connects to your local server, using the helper program *autossh* (installable on many systems with the command `apt install autossh`).

```ini
## /etc/systemd/system/autossh.service

[Unit]
Description=AutoSSH tunnel service for maintenance, connection according to .ssh/config
After=network-online.target

[Service]
# Choose a user that exists. Doesn't matter much
User=pi
Type=simple
Restart=always
Environment="AUTOSSH_GATETIME=0"
ExecStart=/usr/bin/autossh -M 0 -N my-tunnel

[Install]
WantedBy=multi-user.target
```

# Use the reverse SSH tunnel
To connect to the remote server, you can now issue the following command on the local server:

```bash
(local) $ ssh -p 4567 localhost
```

which will connect through the tunnel to the remote server, and prompt for user, password, and key.

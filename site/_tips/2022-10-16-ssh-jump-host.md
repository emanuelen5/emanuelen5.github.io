---
title: 'SSH jump hosts'
what: |
    ```bash
    ssh -J jump target
    ```
why: SSH to a *target* host via a *jump* host
date: 2022-10-16
tags: [ssh]
---

# What
```bash
ssh -J jump target
```

or, if configured in the ssh_config file, we can set up so it works with this nice syntax:

```bash
ssh jump.target
```

# Why
SSH to a *target* host via a *jump* host

<figure class="image" markdown="1">
```asciiart
┌──────────────┐       ┌───────────────┐      ┌────────────┐
│              │       │               │      │            │
│              │       │               │      │            │
│    Source    ├──────►│   Jump host   ├─────►│   Target   │
│              │       │               │      │            │
│              │       │               │      │            │
└──────────────┘       └───────────────┘      └────────────┘
   localhost               10.0.0.50            90.0.0.10
```
<figurecaption>(generated using <a href="https://asciiflow.com">AsciiFlow</a>)</figurecaption>
</figure>

This is useful if we want to reach a server *target* that is not reachable directly from WAN, while the *jump* is.

# How
We just need to configure up the hosts as usual:

{% include code_title.html title="~/.ssh/config" syntax="ssh" anchor="ssh_config1" -%}
```ssh
Host jump
    HostName 10.0.0.50
    # Other settings needed to connect to the jump server (like specifying IdentityFile for an SSH key)

Host target
    HostName 90.0.0.10
    # Any other settings that you need to connect to the target (like specifying IdentityFile for an SSH key)
```

Then we can use the `ssh -J jump target` command to go to *target* via *jump*.

## Adding it to the SSH config instead
We can create a special Host so we don't have to type the `-J` option:

```bash
ssh jump.target
```

all we need to do is to modify the SSH config in the following way:

{% include code_title.html title="~/.ssh/config" syntax="ssh" -%}
```ssh
Host jump
    HostName 10.0.0.50  # Same settings as before

# Add a jump configuration
Host jump.*
    ProxyJump jump

Host target jump.target  # Note the added Host (jump.target)
    HostName 90.0.0.10  # Other settings are identical
```

An arbitrary number of additional jumps can be configured by chaining the *jump* host to go via another exactly like for *target* host.

# Reference
From the man pages:

## [ssh(1): `-J`](https://man7.org/linux/man-pages/man1/ssh.1.html)
> `-J` *destination*
>
> Connect to the target host by first making a `ssh` connection to the jump host described by *destination* and then establishing a TCP forwarding to the ultimate destination from there. [...] This is a shortcut to specify a `ProxyJump` configuration directive.

## [ssh_config(5): `ProxyJump`](https://man7.org/linux/man-pages/man5/ssh_config.5.html)

> `ProxyJump`
>
> Specifies one or more jump proxies as either `[user@]host[:port]` or an ssh URI.
> Multiple proxies may be separated by comma characters and will be visited sequentially.

## Other references
* [[1]\: Tecmint: How to Access a Remote Server Using a Jump Host][tecmint]
* [[2]\: Citizix: How to ssh through host(jumpserver) to reach another server][citizix]
* [[3]\: Gentoo: SSH jump hosts][gentoo]

<!-- References !-->
[tecmint]: https://www.tecmint.com/access-linux-server-using-a-jump-host/
[citizix]: https://citizix.com/how-to-ssh-through-hostjumpserver-to-reach-another-server/
[gentoo]: https://wiki.gentoo.org/wiki/SSH_jump_host

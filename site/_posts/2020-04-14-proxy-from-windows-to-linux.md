# Setting up a proxy to a Linux server

It is really simple to set up a proxy through a Linux server that runs SSH. The simplest way is to use the SOCKS5 procol which utilizes an open SSH tunnel and forwards all traffic through it.

The instructions below are split into separate parts depending on your host OS:

1. [Local machine that runs Windows](#windows-local-machine)
2. [Local machine that runs Linux](#linux-local-machine).

## Windows local machine

### SSH tunnel
1. Install PuTTY
2. Configure a PuTTY session
    1. Add a new PuTTY session that points to the public IP/host name and port of your server that runs SSH. <br>
       ![Adding a new PuTTY session](2020-04-14-proxy-putty-session.png)
    2. Set up the session to forward a port (e.g. 9001) to the server. Type in the local port that it should use, set it to dynamic (i.e. using the SSH tunnel's IP), and press **Add**. <br>
       ![Configuring the session tunnel](2020-04-14-proxy-putty-tunnels.png)
    3. Make sure to save the session if you want to reuse it. Press **Open** to connect and authenticate. <br>
       ![The session is now connected](2020-04-14-proxy-putty-connected.png)
    4. The tunnel is now set up and will stay open for as long as the PuTTY session is alive.

### Global proxy setup
The proxy settings can be set globally through the *Internet Options* control panel

1. Open the start menu and type **Internet Options** to find it. <br>
   ![Internet Options](2020-04-14-proxy-internet-properties.png)
2. Go to **Connections** ➡️ **LAN settings**.
3. Under **Proxy server**, check the box ☒ **Use a proxy server for your LAN**. <br>
   ![Enable proxy server](2020-04-14-proxy-lan-settings.png)
4. Go to **Advanced**.
5. Uncheck the box ☐ **Use the same proxy server for all protocols** and remove all pre-filled fields under the other protocols. Add `localhost:<port>` (i.e. `localhost:9001` in our example) to the **Socks** row. <br>
   ![Proxy settings](2020-04-14-proxy-advanced-settings.png)

## Linux local machine

### SSH tunnel
1. Run the following command on your local machine:
   ```bash
   $ ssh -D 9001 -f -C -q -N <your_linux_server_that_runs_ssh>
   ```

2. The tunnel is now set up and will stay open for as long as the SSH session is alive.

### Global proxy setup
How to do this varies from OS to OS. [Here is a guide that covers Ubuntu 18.04](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-configure-proxy-on-ubuntu-18-04/).

A nice feature with that is the `NO_PROXY` environment variable that can be used for ignoring patterns where the proxy should not be used, e.g. the company intranet.

```bash
export NO_PROXY=localhost,127.0.0.1,*.my.lan.domain
```

## Sources

[1] https://itblogsec.com/how-to-make-socks-proxy-server-by-using-raspberry-pi/ <br>
[2] https://www.reddit.com/r/raspberry_pi/comments/5ltq3h/rpi_as_a_socks_proxy_and_ssh_file_server_tutorial/ <br>
[3] https://www.reddit.com/r/techsupport/comments/4j0l35/windows_10_route_all_traffic_through_socks5_proxy/ <br>

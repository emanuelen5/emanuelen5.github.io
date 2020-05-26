---
finished: true
title: Setting up a Raspberry Pi 3B plus from scratch
date: 2020-04-06
tags: [rpi, ssh, fail2ban]
categories: [guide]
---

Here I will show you basically all of the steps that are needed for installing a Raspberry Pi and setting up a new user on it.
I will set it up to have a user called `emaus` and hostname as `emaus-pi3`, but you can modify that to whatever you want and follow along.

## SD card
1. Write an image to the SD card with [Balena etcher](https://www.balena.io/etcher/) on Windows or [`dd`](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md) on Linux.
2. Add a file called *ssh* to the root of the **boot partition** to enable SSH directly after boot

If you're setting up the SD card on a Linux computer, you can also set up hostname and Wifi before booting the Pi by editing files in the **root file system**:

* Set the hostname of the pi by editing replacing "raspberrypi" in */etc/hostname* and */etc/hosts*:
  ```bash
  cd /mountpoint/of/rpi/rfs
  sed 's/raspberrypi/emaus-pi3/' -i etc/hostname etc/hosts
  ```
* Set up a WiFi connection by adding to */etc/wpa_supplicant/wpa_supplicant.conf*:
  ```
  network={
     ssid="SSID of the access point"
     psk="Password of the access point"
  }
  ```

## Raspberry Pi config
3. SSH into pi with default user and password:
    ```bash
    emaus@pc:~ $ ssh -X pi@raspberrypi.local
    ```
4. Start to set up the pi through the config:
    ```bash
    pi@raspberrypi:~ $ raspi-config
    ```
    * Set hostname to something better
    * Expand filesystem
    * Set locale
5. Check that the date is set appropriately with `date` and set it if it is not.
6. Reboot so that our changes become effective (hostname, filestystem, etc.):
    ```bash
    pi@raspberrypi:~ $ sudo reboot now
    ```
7. SSH into pi with new hostname:
    ```bash
    emaus@pc:~ $ ssh -X pi@emaus-pi3.local
    ```
8. Update it:
    ```bash
    pi@emaus-pi3:~ $ sudo apt update
    pi@emaus-pi3:~ $ sudo apt upgrade -y
    ```

## New user
9. Add a new user with all groups that pi has (but not the `pi` group since we will remove that user):
    ```bash
    pi@emaus-pi3:~ $ groups
    pi adm dialout cdrom sudo audio video plugdev games users input netdev gpio i2c spi
    pi@emaus-pi3:~ $ sudo useradd -m -s /bin/bash -G adm,dialout,cdrom,sudo,audio,video,plugdev,games,users,input,netdev,gpio,i2c,spi <username>
    ```
10. Set password of the new user:
    ```bash
    pi@emaus-pi3:~ $ sudo passwd emaus
    New password:
    Retype new password:
    passwd: password updated successfully
    ```
11. Log out of the session as pi and enter as the new user:
    ```bash
    pi@emaus-pi3:~ $ logout
    Connection to emaus-pi3.local closed.
                                                                                                  ✔
    ───────────────────────────────────────────────────────────────────────────────────────────────
    [2020-04-06 20:31.58]  ~
    [Emanu.Emaus-XPS] ➤ ssh -X emaus@emaus-pi3.local
    ```
12. Remove the `pi` user (all sessions with that user must first be logged out, including GUI if using regular Raspbian):
    ```bash
    emaus@emaus-pi3:~ $ sudo userdel -r pi
    [sudo] password for emaus:
    userdel: pi mail spool (/var/mail/pi) not found
    ```

## SSH security
13. Copy your public SSH keys to the file *.ssh/authorized_keys*:
    ```bash
    emaus@emaus-pi4:~ $ ssh-copy-id -i .ssh/id_rsa emaus@emaus-pi3.local
    ```
14. Make sure that SSH password authentication is disabled by editing the configuration file */etc/ssh/sshd_config*:
    ```sshd
    PermitRootLogin no
    MaxAuthTries 1
    PubkeyAuthentication yes
    [...]

    # To disable tunneled clear text passwords, change to no here!
    PasswordAuthentication no
    ```

## Setting up additional security (fail2ban)
15. Install fail2ban:
    ```bash
    emaus@emaus-pi3:~ $ sudo apt install fail2ban
    emaus@emaus-pi3:~ $ sudo fail2ban-client status
    Status
    |- Number of jail:      1
    `- Jail list:   sshd
    emaus@emaus-pi3:~ $ sudo fail2ban-client status sshd
    Status for the jail: sshd
    |- Filter
    |  |- Currently failed: 0
    |  |- Total failed:     0
    |  `- File list:        /var/log/auth.log
    `- Actions
       |- Currently banned: 0
       |- Total banned:     0
       `- Banned IP list:
    ```
16. Configure ssh filter by editing the file */etc/fail2ban/jail.d/defaults-debian.conf*:
    ```ini
    [sshd]
    enabled = true
    bantime = -1
    findtime = 600
    maxretry = 3
    ignoreip = 192.168.0.0/24
    ```

## Restoring files from an old Pi's SD card
By attaching the old SD card to another Pi, through an USB to SD card reader, I can copy old files to my new Pi.

17. Mount the partition that corresponds to the old root filesystem on the SD card as read-only ([see also previous post]({% link _posts/2020-04-05-backing-up-sd-card-from-crashed-pi.md %})):
    ```bash
    emaus@emaus-pi4:~ $ lsblk
    NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
    sda           8:0    1 14.5G  0 disk
    ├─sda1        8:1    1   63M  0 part
    └─sda2        8:2    1 14.4G  0 part
    mmcblk0     179:0    0 29.4G  0 disk
    ├─mmcblk0p1 179:1    0  256M  0 part /boot
    └─mmcblk0p2 179:2    0 29.2G  0 part /
    emaus@emaus-pi4:~ $ mkdir mounttest
    emaus@emaus-pi4:~ $ sudo mount -o ro /dev/sda2 mounttest/
    ```
18. SCP files from the computer with the card reader (emaus-pi4) to the new pi (emaus-pi3):
    ```bash
    emaus@emaus-pi4:~/mounttest/home/emaus $ cd mounttest/home/emaus
    emaus@emaus-pi4:~/mounttest/home/emaus $ scp -r .ssh emaus@emaus-pi3.local:/home/emaus/.ssh
    ```
    Note that you might have to change priveliges on the .ssh folder to be able to copy it (or run command as sudo).

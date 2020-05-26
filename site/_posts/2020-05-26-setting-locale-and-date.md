---
title: Setting locale and date on Raspberry Pi
date: 2020-05-26 20:54
summary: >
   Some commands for setting the locale and timezone on a Raspberry pi.
tags:
  - rpi
  - locale
  - timezone
categories: miniguide
---

# Setting locale:
```console
root@emaus-pi0:~# localectl status
   System Locale: LANG=C.UTF-8
       VC Keymap: n/a
      X11 Layout: gb
       X11 Model: pc105
root@emaus-pi0:~# localectl set-locale LANG=en_US.UTF-8
root@emaus-pi0:~# vim /etc/default/locale
```

Change locale:
```
LANG=en_US.UTF-8
```

Update locale and set X11 layout:

```console
root@emaus-pi0:~# update-locale
root@emaus-pi0:~# localectl status
   System Locale: LANG=en_US.UTF-8
       VC Keymap: n/a
      X11 Layout: gb
       X11 Model: pc105
root@emaus-pi0:~# localectl set-x11-keymap us
root@emaus-pi0:~# localectl
   System Locale: LANG=en_US.UTF-8
       VC Keymap: us
      X11 Layout: us
```

# Setting timezone:
```console
root@emaus-pi0:~# timedatectl
               Local time: Tue 2020-05-26 19:52:20 BST
           Universal time: Tue 2020-05-26 18:52:20 UTC
                 RTC time: n/a
                Time zone: Europe/London (BST, +0100)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
root@emaus-pi0:~# ls -l /etc/localtime
lrwxrwxrwx 1 root root 33 Feb 13 15:58 /etc/localtime -> /usr/share/zoneinfo/Europe/London
root@emaus-pi0:~# timedatectl list-timezones | grep -i stockholm
Europe/Stockholm
root@emaus-pi0:~# timedatectl set-timezone Europe/Stockholm
root@emaus-pi0:~# date
Tue May 26 20:53:08 CEST 2020
```


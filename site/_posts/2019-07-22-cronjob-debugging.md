---
finished: true
title: Cronjobs - timely done
date: 2019-07-22
tags: [cron, bash, linux, debugging]
categories: miniguide
---

If you want something done at a specific time (down to a minute's resolution) with a repetition, then cron is the best.

```bash
# Run as root
sudo crontab -e
# Can also run as any other user
sudo crontab -u emaus -e
```

This will then open up the crontab in an editor. Add the following to run a script called `/home/emaus/service_pi_led_function.sh` every minute of the day.

```crontab
# crontab
# m h  dom mon dow   command

* * * * * /home/emaus/service_pi_led_function.sh
```

**N.B. 1:** Make sure the script to be run is executable 🤓 (`chmod +x <script>`). [Debugged by using text logging](#logging-program-output). <br>
**N.B. 2:** The cronjob is not updated until you *exit* the crontab editor. [Debugged by using crontab service logger](#enabling-crontab-service-logging). <br>
**N.B. 3:** Make sure that the crontab has the correct PATH set up ([see this SO answer](https://stackoverflow.com/a/2409369/4713758), or [my final crontab](#crontab))

## Sunrise/sunset

If you want something done relative to sunrise/sunset, then [sunwait by risacher on Github](https://github.com/risacher/sunwait) is perfect.

```bash
git clone git@github.com:risacher/sunwait.git
cd sunwait
make
sudo install sunwait /usr/local/bin/
```

Testing the program at night with the coordinates for Stockholm yields:

```bash
$ sunwait poll 59.3260668N 17.8419725E
NIGHT
```

This could be combined with getting approximate location of your own IP address and then inputting that.
E.g. [ipfy.org](https://www.ipfy.org) has an API for getting your public IP address, e.g.:

```bash
$ echo $(curl 'https://api.ipify.org?format=text' -s)
80.216.68.127
```

A service like [ipinfo.io](https://ipinfo.io/) can then be used for getting the approximate coordinates of the public IP. E.g.

```bash
$ curl ipinfo.io/8.8.8.8
{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.3860,-122.0838",
  "org": "AS15169 Google LLC",
  "postal": "94035",
  "timezone": "America/Los_Angeles",
  "readme": "https://ipinfo.io/missingauth"
}
```

## Debugging

### Logging program output

Get the output of the command:

```crontab
* * * * * /home/emaus/service_pi_led_function.sh > /home/emaus/crontab.log 2>&1
```

This might reveal the following:

```bash
/home/emaus/service_pi_led_function.sh: 1: /home/emaus/service_pi_led_function.sh: sunwait: not found
/home/emaus/service_pi_led_function.sh: 1: [: =: unexpected operator
```

### Enabling crontab service logging
Enable logging so you can see each time the command is invoked ([credits to this SO-answer](https://stackoverflow.com/a/34872041/4713758)).

Ensuring the following line is in `/etc/rsyslog.conf`:
```
cron.*                         /var/log/cron.log
```

Then restart `rsyslog` and `cron`:

```bash
sudo service rsyslog restart
sudo service cron restart
```

You can then find the logs in `/var/log/cron.log`.

This file will look something like the following:
```
Jul 22 22:11:45 Emaus-pi3 cron[13235]: (CRON) INFO (pidfile fd = 3)
Jul 22 22:11:45 Emaus-pi3 cron[13235]: (CRON) INFO (Skipping @reboot jobs -- not system startup)
Jul 22 23:41:01 Emaus-pi3 CRON[17431]: (root) CMD (/home/emaus/service_pi_led_function.sh)
Jul 22 23:41:01 Emaus-pi3 CRON[17427]: (CRON) info (No MTA installed, discarding output)
Jul 22 23:41:47 Emaus-pi3 crontab[16002]: (root) REPLACE (root)
Jul 22 23:41:47 Emaus-pi3 crontab[16002]: (root) END EDIT (root)
Jul 22 23:42:01 Emaus-pi3 cron[13235]: (root) RELOAD (crontabs/root)
Jul 22 23:42:01 Emaus-pi3 CRON[17896]: (root) CMD (/home/emaus/service_pi_led_function.sh > /home/emaus/crontab.log 2>&1)
```


# Final result

## Crontab:
```crontab
# sudo crontab -e

SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

* * * * * /home/emaus/service_pi_led_function.sh
```

## Script for setting Raspberry Pi LED function at day/night

```bash
# service_pi_led_function.sh

# At day, user regular LED functionality
if [ $(sunwait poll 59.3520323N 50.9725342E) = "DAY" ]; then
    sudo sh -c "echo mmc0 > /sys/class/leds/led0/trigger"
    sudo sh -c "echo input > /sys/class/leds/led1/trigger"
# Turn of LEDs at night so they do not disturb my girlfriend
else
    sudo sh -c "echo gpio > /sys/class/leds/led0/trigger"
    sudo sh -c "echo 0 > /sys/class/leds/led0/brightness"
    sudo sh -c "echo gpio > /sys/class/leds/led1/trigger"
    sudo sh -c "echo 0 > /sys/class/leds/led1/brightness"
fi
```

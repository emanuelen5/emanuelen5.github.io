---
title: Installing Homeassistant in a Docker container
date: 2021-07-18 21:00
summary: > 
   How to install Homeassistant in a Docker container.
tags: [ha, docker]
categories: guide
---


Unhealthy docker environment: https://www.home-assistant.io/more-info/unhealthy/docker

Check the minimum supported version: https://www.home-assistant.io/more-info/unsupported/docker_version (currently 19.03.0)

```bash
$ docker --version
Docker version 18.09.1, build 4c52b90
```

```bash
docker stop homeassistant hassio_multicast hassio_observer hassio_cli hassio_audio hassio_dns hassio_supervisor
sudo apt remove -y docker.io

# Install newer version
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
docker start homeassistant hassio_multicast hassio_observer hassio_cli hassio_audio hassio_dns
hassio_supervisor
```


# Install some addons
![Homeassistant addons](./homeassistant-addons.png)


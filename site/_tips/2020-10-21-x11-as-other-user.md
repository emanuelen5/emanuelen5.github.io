---
title: X11 as another user
what: |
   ```bash
   xauth add $(xauth -f ~${user}/.Xauthority list | tail -1)
   ```
why: Run X11 programs as another user
date: 2020-09-23
tags: [bash, x11]
---

# What
```bash
xauth add $(xauth -f ~${user}/.Xauthority list | tail -1)
```

# Why
So that you can run X11 when you are logged in as another user (e.g. root).


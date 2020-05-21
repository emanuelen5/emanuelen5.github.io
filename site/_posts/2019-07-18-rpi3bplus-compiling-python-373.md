---
finished: true
title: Compiling Python 3.7.3 on Raspberry Pi Jessie
date: 2019-07-18
tags: [rpi, python]
categories: [miniguide, build]
---

Building Python can be a breeze! [This guide has helped me in the past](https://www.scivision.dev/compile-install-python-beta-raspberry-pi/).
```bash
sudo apt install libffi-dev libbz2-dev liblzma-dev libsqlite3-dev libncurses5-dev libgdbm-dev zlib1g-dev libreadline-dev libssl-dev tk-dev build-essential libncursesw5-dev libc6-dev openssl git
```

```bash
git clone git@github.com:python/cpython.git
cd cpython
./configure --enable-optimizations
make -j8
sudo make install
```

## If it wasn't able to compile some libraries
Sometimes it is harder to get it to work...

### Not able to compile `_ssl`?

For me \_ssl did not compile since it complained on an -fPIC.
Clone the openssl repo and build it yourself.
```bash
git clone git@github.com:openssl/openssl.git
cd openssl
./config -fPIC
make -j8
sudo make install
# Go back to the cpython directory and compile using the new openssl
cd /path/to/cpython
./configure --with-openssl=/usr/local/ssl --enable-optimizations LDFLAGS="-L/usr/local/ssl/lib" CFLAGS=-fPIC
```

### Not able to compile `__uuid`?
Might also need uuid-dev (if it complains on [*missing _uuid*](https://www.reddit.com/r/learnpython/comments/8uohge/uuid_module_missing_when_building_python_37/?utm_source=share&utm_medium=web2x))

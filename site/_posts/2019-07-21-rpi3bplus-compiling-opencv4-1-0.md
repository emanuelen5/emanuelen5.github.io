---
finished: true
title: Compiling OpenCV 4.1 on Raspberry Pi Jessie for Python 3.7.3
date: 2019-07-21
tags: [rpi, python, opencv]
categories: [miniguide, build]
---

Download [OpenCV](https://github.com/opencv/opencv/releases) and the [contributed functionality](https://github.com/opencv/opencv_contrib/releases) (extra modules), and extract them (will be placed in `opencv-4.1.0` and `opencv_contrib-4.1.0`:
```bash
wget -O opencv.zip https://github.com/opencv/opencv/releases/download/4.1.0/opencv-4.1.0-docs.zip
unzip opencv.zip

wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.1.0.zip
unzip opencv_contrib.zip

cd ~/opencv-4.1.0/
```

Create a directory `build` where the build artifacts will be placed, then configure the build with *cmake* and build:

```bash
mkdir build && cd build

# This takes just a minute
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D ENABLE_PRECOMPILED_HEADERS=OFF \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-4.1.0/modules \
    -D BUILD_EXAMPLES=ON ..

# This takes many hours (7h on mine)
make
# It is possible to run with several cores if you have good enough cooling
```

The compilation got stuck at the "final" stage, where `cv2.cpp.o` was being built. The green LED which symbolizes mmc0/SD card activity was lit green constantly and the terminal hanged (most likely due to constant swapping). After some time the compilation failed with an error similar to the following:

```bash
[ 85%] Building CXX object modules/python3/CMakeFiles/opencv_python3.dir/__/src2/cv2.cpp.o
c++: internal compiler error: Killed (program cc1plus)
Please submit a full bug report,
with preprocessed source if appropriate.
See <file: usr="" share="" doc="" gcc-6="" readme.bugs=""> for instructions.
modules/python3/CMakeFiles/opencv_python3.dir/build.make:62: recipe for target 'modules/python3/CMakeFiles/opencv_python3.dir/__/src2/cv2.cpp.o' failed
make[2]: *** [modules/python3/CMakeFiles/opencv_python3.dir/__/src2/cv2.cpp.o] Error 4
CMakeFiles/Makefile2:24733: recipe for target 'modules/python3/CMakeFiles/opencv_python3.dir/all' failed
make[1]: *** [modules/python3/CMakeFiles/opencv_python3.dir/all] Error 2
Makefile:160: recipe for target 'all' failed
make: *** [all] Error 2
```

I managed to solve it by increasing the swap file size (taken [from this tutorial](https://www.alatortsev.com/2018/11/21/installing-opencv-4-0-on-raspberry-pi-3-b/)) from 100MB (default size) to twice the RAM-size (about 2GB). This is done by temporarily making a change in the file `/etc/dphys-swapfile`:

```bash
# [...]
#CONF_SWAPSIZE=100

# [...]
CONF_SWAPFACTOR=2
```

The service that manages the swap file then has to be restarted:

```bash
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```

Typing the `free -m` command should then show something similar to:

```bash
             total       used       free     shared    buffers     cached
Mem:           859        621        238         43        117        416
-/+ buffers/cache:         87        772
Swap:         1718          0       1718

```

```bash
sudo make install
sudo ldconfig
sudo apt-get update
# Adding the newly compiled OpenCV library to a virtual environment
ln -s /usr/local/lib/python3.7/site-packages/cv2/python-3.7/cv2.cpython-37m-arm-linux-gnueabihf.so ~/venv/lib/python3.7/site-packages/cv2.so
```

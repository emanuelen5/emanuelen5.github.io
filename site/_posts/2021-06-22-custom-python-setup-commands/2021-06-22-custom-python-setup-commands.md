---
title: Custom Python setuptools commands
date: 2021-06-22 21:50
summary: > 
   How to set up Python setuptools to run custom code on install or build.
tags: [python, setuptools, pip]
categories: guide
---


Let say you have a simple install script for a package:

#### [**`setup.py`**](./setup.py)
```python
{% include_relative setup.py -%}
```

And you want to add a custom command to be run during the install process. This is actually very easy to achieve!

## Modified setup.py

You simply need to:

1. Import the command class
1. Create a class that inherits from that class, but overrides the `run` method to do what you like instead. 
1. Then, let the setup package know of the custom command override that you want to use.


#### [**`setup_overridden.py`**](./setup_overridden.py)
```python
{% include_relative setup_overridden.py -%}
```

Other commands can be overridden in an anologous way (subsituting `install` for another command, like `build`, `build_py`, etc.). See <https://docs.python.org/3/distutils/apiref.html#module-distutils.command> for details on the different commands available.

### Install
Installing the modified package however shows no sign of of the modifications (*Running custom command!* is never printed)!

```console
$ pip install .
Processing /tmp/test
Building wheels for collected packages: package-name
  Building wheel for package-name (setup.py) ... done
  Created wheel for package-name: filename=package_name-1.0.0-py3-none-any.whl size=1045 sha256=1e6ebf07649a28a42fd3ce41077f0abbed4e9e0593175776444d42aff4cf6fb7
  Stored in directory: /tmp/pip-ephem-wheel-cache-riywfbyt/wheels/88/36/8d/03b070db53bc124488b9daa3226de7abdcc759470790b534d1
Successfully built package-name
Installing collected packages: package-name
  Attempting uninstall: package-name
    Found existing installation: package-name 1.0.0
    Uninstalling package-name-1.0.0:
      Successfully uninstalled package-name-1.0.0
Successfully installed package-name-1.0.0
WARNING: You are using pip version 20.3.3; however, version 21.1.2 is available.
You should consider upgrading via the '/tmp/venv/bin/python -m pip install --upgrade pip' command.
```

This is due to `pip` swallowing the standard output. To show them, we need to increase the verbosity.

# Debug with pip


```console
$ pip install -v .
```

This prints all of the steps that are run when installing the Python package, and can help in debugging your own extensions.

Running that will produce the following output:

```
Using pip 20.3.3 from /tmp/venv/lib/python3.9/site-packages/pip (python 3.9)
Non-user install because user site-packages disabled
Created temporary directory: /tmp/pip-ephem-wheel-cache-fmba4u1y
Created temporary directory: /tmp/pip-req-tracker-yoxvk28o
Initialized build tracking at /tmp/pip-req-tracker-yoxvk28o
Created build tracker: /tmp/pip-req-tracker-yoxvk28o
Entered build tracker: /tmp/pip-req-tracker-yoxvk28o
Created temporary directory: /tmp/pip-install-841rcwae
Processing /tmp/test
  Created temporary directory: /tmp/pip-req-build-9v5go3l3
  Added file:///tmp/test to build tracker '/tmp/pip-req-tracker-yoxvk28o'
    Running setup.py (path:/tmp/pip-req-build-9v5go3l3/setup.py) egg_info for package from file:///tmp/test
    Created temporary directory: /tmp/pip-pip-egg-info-ktedvm95
    Running command python setup.py egg_info
    running egg_info
    creating /tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info
    writing /tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/PKG-INFO
    writing dependency_links to /tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/dependency_links.txt
    writing top-level names to /tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/top_level.txt
    writing manifest file '/tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/SOURCES.txt'
    reading manifest file '/tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/SOURCES.txt'
    writing manifest file '/tmp/pip-pip-egg-info-ktedvm95/package_name.egg-info/SOURCES.txt'
  Source in /tmp/pip-req-build-9v5go3l3 has version 1.0.0, which satisfies requirement package-name==1.0.0 from file:///tmp/test
  Removed package-name==1.0.0 from file:///tmp/test from build tracker '/tmp/pip-req-tracker-yoxvk28o'
Created temporary directory: /tmp/pip-unpack-2ciz7m_r
Building wheels for collected packages: package-name
  Created temporary directory: /tmp/pip-wheel-je2yu2f3
  Building wheel for package-name (setup.py) ...   Destination directory: /tmp/pip-wheel-je2yu2f3
  Running command /tmp/venv/bin/python -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-req-build-9v5go3l3/setup.py'"'"'; __file__='"'"'/tmp/pip-req-build-9v5go3l3/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' bdist_wheel -d /tmp/pip-wheel-je2yu2f3
  running bdist_wheel
  running build
  installing to build/bdist.linux-x86_64/wheel
  running install
  Running custom command!
  running install_egg_info
  running egg_info
  creating package_name.egg-info
  writing package_name.egg-info/PKG-INFO
  writing dependency_links to package_name.egg-info/dependency_links.txt
  writing top-level names to package_name.egg-info/top_level.txt
  writing manifest file 'package_name.egg-info/SOURCES.txt'
  reading manifest file 'package_name.egg-info/SOURCES.txt'
  writing manifest file 'package_name.egg-info/SOURCES.txt'
  Copying package_name.egg-info to build/bdist.linux-x86_64/wheel/package_name-1.0.0-py3.9.egg-info
  running install_scripts
  creating build/bdist.linux-x86_64/wheel/package_name-1.0.0.dist-info/WHEEL
  creating '/tmp/pip-wheel-je2yu2f3/package_name-1.0.0-py3-none-any.whl' and adding 'build/bdist.linux-x86_64/wheel' to it
  adding 'package_name-1.0.0.dist-info/METADATA'
  adding 'package_name-1.0.0.dist-info/WHEEL'
  adding 'package_name-1.0.0.dist-info/top_level.txt'
  adding 'package_name-1.0.0.dist-info/RECORD'
  removing build/bdist.linux-x86_64/wheel
done
  Created wheel for package-name: filename=package_name-1.0.0-py3-none-any.whl size=1045 sha256=bacf8fa6a6c63156f3c42902cc48f51e87eb03c51b142b111b93a7e3348c13cc
  Stored in directory: /tmp/pip-ephem-wheel-cache-fmba4u1y/wheels/88/36/8d/03b070db53bc124488b9daa3226de7abdcc759470790b534d1
Successfully built package-name
Installing collected packages: package-name
  Attempting uninstall: package-name
    Found existing installation: package-name 1.0.0
    Uninstalling package-name-1.0.0:
      Created temporary directory: /tmp/venv/lib/python3.9/site-packages/~ackage_name-1.0.0.dist-info
      Removing file or directory /tmp/venv/lib/python3.9/site-packages/package_name-1.0.0.dist-info/
      Successfully uninstalled package-name-1.0.0

Successfully installed package-name-1.0.0
WARNING: You are using pip version 20.3.3; however, version 21.1.2 is available.
You should consider upgrading via the '/tmp/venv/bin/python -m pip install --upgrade pip' command.
Removed build tracker: '/tmp/pip-req-tracker-yoxvk28o'
```

Note two things:
1. Our custom command is run (**Running custom command!** is printed)
1. Also, it prints out all of the setuptools steps that are run during the installation. In this case:
    1. `egg_info`
    1. `bdist_wheel`
    1. `build`
    1. `install`
    1. `install_egg_info`
    1. `egg_info`
    1. `install_scripts`

# Sources of information
* <https://setuptools.readthedocs.io/en/latest/userguide/package_discovery.html>
* <https://www.anomaly.net.au/blog/running-pre-and-post-install-jobs-for-your-python-packages/>
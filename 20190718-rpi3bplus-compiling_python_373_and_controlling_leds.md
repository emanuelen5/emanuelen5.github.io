# Compiling Python 3.7.3 on Rasbperry Pi Jessie

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

# Controlling Raspberry Pi LEDs
Taken from [Jeff Geerling: Controlling PWR and ACT LEDs on the Raspberry Pi](https://www.jeffgeerling.com/blogs/jeff-geerling/controlling-pwr-act-leds-raspberry-pi). I have tested this on my Raspberry Pi B+.

Luckily, with the Pi 2 model B, B+, A+, and Zero, you can control the LEDs in software, in a few different ways. The simplest way to change the way these LEDs work is to modify the trigger for each LED by setting it in `/sys/class/leds/led[LED_ID]/trigger`, where you replace `[LED_ID]` with 0 for the green ACT LED, and 1 for the red PWR LED.
```bash
# Set the PWR LED to GPIO mode (set 'off' by default).
echo gpio | sudo -c sh "cat > /sys/class/leds/led1/trigger"

# (Optional) Turn on (1) or off (0) the PWR LED.
echo 1 | sudo -c sh "cat > /sys/class/leds/led1/brightness"
echo 0 | sudo -c sh "cat > /sys/class/leds/led1/brightness"

# Revert the PWR LED back to 'under-voltage detect' mode.
echo input | sudo -c sh "cat > /sys/class/leds/led1/trigger"

# Set the ACT LED to trigger on cpu0 instead of mmc0 (SD card access).
echo cpu0 | sudo -c sh "cat > /sys/class/leds/led0/trigger"
```

Turn off leds:
```bash
#/boot/config.txt

# Disable the ACT LED.
dtparam=act_led_trigger=none
dtparam=act_led_activelow=off

# Disable the PWR LED.
dtparam=pwr_led_trigger=none
dtparam=pwr_led_activelow=off
```
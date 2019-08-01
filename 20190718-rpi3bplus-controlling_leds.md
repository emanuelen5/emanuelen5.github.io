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

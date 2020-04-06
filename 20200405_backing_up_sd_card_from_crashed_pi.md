# Backing up an SD card from a crashed Raspberry Pi

So, yay. The Raspberry Pi has had a kernel panic and won't start again. So, I guess I'll have to just recover the files and copy them to a new SD card.

The first problem is that I'm running Windows on my regular computer and therefore cannot read the root file system partition of the SD card without any tools. And this wasn't as easy as I'd imagined...

## Reading the ext4 file system on Windows
I used Virtualbox together with an USB SD card reader. The hard thing was to manage to get my Ubuntu virtual machine to get access to the USB stick. Turns out that the reader would only mount if I had the Virtualbox Extension package installed. **But**, note that it has to be the exact same version as the version of Virtualbox that is installed. Otherwise Virtualbox will report errors after it has been installed that it cannot load the main .dll-file in the extension package. And, if you got on and try to fire up the virtual machine and pass over the USB drive to it, then it will fire an error:

> Virtualbox failed to attach usb device [...] to the virtual machine (with error name: `VERR_PDM_NO_USB_PORTS`)

After that was fixed, I could really just do the regular mount procedure and lift off my files! Oh happy days :)

```bash
mkdir $mountpoint
mount /dev/sda2 $mountpoint
cd $mountpoint
scp ... emaus@otherpi.local:/home/emaus/location
```
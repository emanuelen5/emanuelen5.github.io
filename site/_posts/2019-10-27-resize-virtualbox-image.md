---
finished: true
title: Resizing a Virtual Box image
date: 2019-10-27
tags: [virtualbox, parted, ubuntu]
categories: [miniguide, tools]
---

I decided to upgrade my Ubuntu installation from 16 to 18 but realized I had quite limited memory left on the disk. So I had to inevitably increase the size of the disk :)

This is not hard, but takes a couple of steps:

1. Make a backup of the original image
2. Resize the image
3. Resize the partition
4. Update the fstab table with new partition UUID:s

## Creating a copy
Make sure to first copy the disk in case we do something wrong:

```bash
$ VBoxManage clonemedium "Ubuntu 16.04 LTS.vdi" "Ubuntu 18.04 LTS.vdi"
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
Clone medium created in format 'VDI'. UUID: 010688e2-34a3-462c-9aa2-4d477fc7f35b
```

## Resizing
Now we need to resize the disk size available for the image. This step goes really quickly if is is set up as dynamically allocated.
```bash
$ VBoxManage modifymedium "Ubuntu 18.04 LTS.vdi" --resize 30000
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
```

## Resize the partition
This is the most complex step and where things can go wrong. We will use the GParted live CD to modify the newly created image.

### GParted live CD
This is done using a GParted live CD. Download it from e.g. <https://gparted.sourceforge.io/livecd.php> and set up a new virtual machine that starts with it and the newly created image mounted.

### Remove SWAP partition
First we will have to move the SWAP partition that is located after the main partition. We will completely remove it and then recreate it as it is otherwise blocking us from expanding the main paritition.

### Expand filesystem
When the SWAP partition has been removed we can expand the main paritition by resizing it to the new size (minus the space that the new SWAP partition will take up).

### Recreate SWAP partition
Then create the SWAP partition and press *apply*.

Shut down GParted and then boot up the modified .vdi image.

## Update the fstab table
You might notice that it takes unusually long time to boot the modified image. This is because it no longer is able to mount the swap partition since it has changed UUID. We therefore have to modify the fstab table with the new UUID.

Run the `lsblk` or `blkid` to get the UUID of the newly created swap partition (sda5).
```bash
$ lsblk -o +UUID
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT UUID
sda      8:0    0 29,3G  0 disk
├─sda1   8:1    0 27,4G  0 part /          9ed27326-80bf-433e-8b59-e409aa7d15ab
├─sda2   8:2    0    1K  0 part
└─sda5   8:5    0    2G  0 part     2c662c96-ab37-4d26-85bc-2b0472c7cff9
sr0     11:0    1 1024M  0 rom
```

As you can see, it has not been mounted. To fix this we have to grab its UUID and place it in the fstab file as a SWAP partition:

```fstab
# /etc/fstab: static file system information.
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda1 during installation
UUID=9ed27326-80bf-433e-8b59-e409aa7d15ab /               ext4    errors=remount-ro 0       1
# swap was on /dev/sda5 during installation
UUID=2c662c96-ab37-4d26-85bc-2b0472c7cff9 none            swap    sw              0       0
```

Now just mount the SWAP partition and everything is good to go:

```bash
$ sudo mount -a
```

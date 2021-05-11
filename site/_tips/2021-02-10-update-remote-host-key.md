---
title: Update remote host key
what: |
   ```bash
   ssh-keygen -R <hostname>
   ssh-keyscan -H <hostname> >> ~/.ssh/known_hosts
   ```
why: Be able to SSH into machine without warning about fingerprint
date: 2021-02-10
tags: [ssh]
---

# What
```bash
ssh-keygen -R <hostname>
ssh-keyscan -H <hostname> >> ~/.ssh/known_hosts
```

# Why
To clear the error when the remote machine has changed their fingerprint (typically when working with embedded Linux that creates a new key at each boot).

# Reference
From the man pages:

## [ssh-keygen](https://linux.die.net/man/1/ssh-keygen)

> *ssh-keygen -R hostname*
> 
> Removes all keys belonging to hostname from a known\_hosts file. This option is useful to delete hashed hosts (see the -H option above).

## [ssh-keyscan](https://linux.die.net/man/1/ssh-keyscan)

> *ssh-keyscan -H'*
>
> Hash all hostnames and addresses in the output. Hashed names may be used normally by ssh and sshd, but they do not reveal identifying information should the file's contents be disclosed. 


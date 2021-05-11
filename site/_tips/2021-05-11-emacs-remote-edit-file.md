---
title: 'Emacs: remote edit file'
what: |
   In Emacs: <kbd>Ctrl</kbd> + <kbd>x</kbd>, <kbd>Ctrl</kbd> + <kbd>f</kbd> <br>
   <code>/ssh:<em>user</em>@<em>host</em>:<em>filename</em></code>
why: Edit a file on a remote server that doesn't have an editor installed
date: 2021-05-11
tags: [ssh, emacs]
---

# What
In Emacs: Press <kbd>Ctrl</kbd> + <kbd>x</kbd>, <kbd>Ctrl</kbd> + <kbd>f</kbd> and type the path of the file to open on a remote host:

<code>/ssh:<em>user</em>@<em>host</em>:<em>filename</em></code>

# Why
You can edit files directly on other hosts using a locally installed Emacs. The remote host does not need an editor installed, it just needs an SSH server.

This can be practical for editing files on embedded hosts.

# Reference
From the man pages:

## [gnu emacs:Remote-Files](https://www.gnu.org/software/emacs/manual/html_node/emacs/Remote-Files.html)

> You can refer to files on other machines using a special file name syntax:
>
>     /method:host:filename
>     /method:user@host:filename
>     /method:user@host#port:filename

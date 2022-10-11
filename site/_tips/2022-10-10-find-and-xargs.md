---
title: 'Find + xargs'
what: |
    ```bash
    find . -type f -print0 | xargs -0 <command>
    ```
why: Use a listing of files from <code>find</code> together with <code>xargs</code>
date: 2022-10-10
tags: [bash]
---

# What
```bash
find . -type f -print0 | xargs -0 <command>
```

# Why
Some files have spaces or newlines in them which does not work. Using this incantation, `<comand>` is be run individually on each file that the `find` command lists.

# How
The argument `-print0` for `find` makes it separate each output row with a null terminator instead of newlines.

The argument `-0` for `xargs` makes it take inputs separated by null terminators instead of whitespace.

The arguments `-I{}` for `xargs` makes it possible to further specify the formatting of the call for the `<command>`. Like adding quotation:

```bash
find . -type f -print0 | xargs -0 -I{} basename "{}"
```

# Reference
From the man pages:

## [gnu xargs:OPTIONS](https://man7.org/linux/man-pages/man1/xargs.1.html#OPTIONS)

> `-0, --null`
>
> Input items are terminated by a null character instead of
> by whitespace, and the quotes and backslash are not
> special (every character is taken literally). [...] The GNU find `-print0`
> option produces input suitable for this mode. 

> `-I replace-str`
>
> Replace occurrences of replace-str in the initial-
> arguments with names read from standard input. 
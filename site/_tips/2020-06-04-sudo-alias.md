---
title: sudo alias
what: |
   ```bash
   alias sudo='sudo '
   ```
why: Run aliases with sudo
tags: [bash]
---

# What
Add a `sudo` alias to your shell:

```bash
# in your .bashrc or similar setup script
alias sudo='sudo '
```

# Why
So you can run any alias with sudo.

# Explanation
The magic is in the blank line at the end of the alias which makes the shell check if the word after "sudo" is also an alias, and then expands it.

# Reference
The Bash manual's section on aliases: <https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Aliases>

> *Aliases* allow a string to be substituted for a word when it is used as the **first word** of a simple command.
> **[...]**
> If the last character of the alias value is a *blank*, then the next command word following the alias is also checked for alias expansion. 

# Found

{:.stack}
1. When looking at Z-shell plugins and [comparing zsh versus fish](https://zellwk.com/blog/bash-zsh-fish/).<br>
1. Linked to his dotfiles where I found [the strange alias](https://github.com/zellwk/dotfiles/blob/06e0411183/env/aliases-shared.sh#L42-L43).<br>
1. That I duckduckgo:ed up [to have a nice explanation](https://linuxhandbook.com/run-alias-as-sudo/) that referred to the Bash manual.

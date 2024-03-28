---
title: Terminal keyboard shortcuts
date: 2024-03-28 17:26
summary: >
   I've gathered some haxy stuff for the terminal since I tend to forget a lot of them.
tags:
  - linux
  - bash
  - terminal
  - shortcuts
categories: cheat-sheet
---

# Shortcuts for emacs mode (`set -o emacs`)

## Shortcuts

### History
| Command                       | Description                    |
|:------------------------------|--------------------------------|
| <kbd>Ctrl</kbd>+<kbd>\_</kbd> | Undo last key press            |
| <kbd>Alt</kbd>+<kbd><</kbd>   | Go to start of history         |
| <kbd>Alt</kbd>+<kbd>></kbd>   | Go to end of history (current) |
| <kbd>Ctrl</kbd>+<kbd>r</kbd>  | Search backwards in history    |
| <kbd>Ctrl</kbd>+<kbd>s</kbd>  | Search forwards in history (must use together with `stty -ixon`, see the [general shell settings](#general-shell-settings)) |
| <kbd>Ctrl</kbd>+<kbd>g</kbd>  | Cancel search                  |
| <kbd>Ctrl</kbd>+<kbd>o</kbd>  | Run current command            |
| <kbd>Alt</kbd>+<kbd>r</kbd>   | Revert any changes to a command you’ve pulled from your history if you’ve edited it. |

### Navigation
| Command                      | Description                    |
|:-----------------------------|--------------------------------|
| <kbd>Ctrl</kbd>+<kbd>a</kbd> | Go to beginning of line        |
| <kbd>Ctrl</kbd>+<kbd>e</kbd> | Go to end of line              |
| <kbd>Ctrl</kbd>+<kbd>b</kbd> | Go backwards one character     |
| <kbd>Alt</kbd>+<kbd>b</kbd>  | Go backwards one word          |
| <kbd>Ctrl</kbd>+<kbd>f</kbd> | Go forwards one character      |
| <kbd>Alt</kbd>+<kbd>f</kbd>  | Go forwards one word           |
| <kbd>Ctrl</kbd>+<kbd>x</kbd>, <kbd>Ctrl</kbd>+<kbd>x</kbd> | Move between the beginning of the line and the current position of the cursor |

### Capitalization
| Command  | Description                    |
|:---------|--------------------------------|
| <kbd>Alt</kbd>+<kbd>u</kbd>  | Capitalize every character from the cursor to the end of the current word, converting the characters to upper case.| 
| <kbd>Alt</kbd>+<kbd>l</kbd>  | Uncapitalize every character from the cursor to the end of the current word, converting the characters to lower case.| 
| <kbd>Alt</kbd>+<kbd>c</kbd>  | Capitalize the character under the cursor. Your cursor will move to the end of the current word.| 

### Editing
| Command  | Description                    |
|:---------|--------------------------------|
| <kbd>Ctrl</kbd>+<kbd>d</kbd>  | Delete the character under the cursor | 
| <kbd>Alt</kbd>+<kbd>d</kbd>   | Delete the part of the word that starts at (and is after) the cursor | 
| <kbd>Ctrl</kbd>+<kbd>h</kbd>  | Delete the character before the cursor | 
| <kbd>Alt</kbd>+<kbd>h</kbd>   | Delete the part of the word that ends at (is before) the cursor | 

### Cut and paste
| Command  | Description                    |
|:---------|--------------------------------|
| <kbd>Ctrl</kbd>+<kbd>w</kbd>  | Cut the word before the cursor, adding it to the clipboard.                    | 
| <kbd>Ctrl</kbd>+<kbd>k</kbd>  | Cut the part of the line after the cursor, adding it to the clipboard.         | 
| <kbd>Ctrl</kbd>+<kbd>u</kbd>  | Cut the part of the line before the cursor, adding it to the clipboard.        | 
| <kbd>Ctrl</kbd>+<kbd>y</kbd>  | Paste the last thing you cut from the clipboard. The y here stands for “yank”. | 

# Shortcuts for vi mode (`set -o vi`)
See [\[3\]](#sources).

# General shell settings
## <kbd>Ctrl</kbd>+<kbd>s</kbd> behavior
```bash
stty -ixon # Make the terminal not stop when pressing Ctrl-s
stty ixany # Revert
```

# Sources:
**[1]** [How to geek: Keyboard shortcuts for bash command shell \[...\]][howtogeek] \
**[2]** [Digital ocean: How to use bash history commands and expansion \[...\]][digitalocean] \
**[3]** [Catonmat: Bash VI editing mode cheat sheet][catonmat]

[howtogeek]: https://www.howtogeek.com/howto/ubuntu/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc
[digitalocean]: https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps
[catonmat]: http://www.catonmat.net/download/bash-vi-editing-mode-cheat-sheet.pdf

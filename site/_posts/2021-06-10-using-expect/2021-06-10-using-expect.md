---
title: Expect scripting language
date: 2021-06-10 21:52
summary: > 
   In this short guide I will show you some tips on how to get started with the *expect* scripting language.
tags: [tcl, expect, tips]
categories: guide
---

The expect scripting language is an extension to *tcl* that can automate applications that have user input prompts. If you haven't already, then read [likegeeks] article about it, which is quite comprehensive for starters.

## Example scenario
Let's say we have an application that we know requires specific keyboard input, like filling in forms or pressing *Continue* at prompts.

We can then write an expect script that waits for a printout by the application that matches specific *patterns* and then react to them.

### Example program to automate

[**`greet.sh`**](./greet.sh)
```bash
{% include_relative greet.sh -%}
```

#### *Expect* script to automate it
The following script can automate the input for the program:

[**`tell_name.exp`**](./tell_name.exp)
```tcl
{% include_relative tell_name.exp -%}
```

And is run using the following command:
```console
$ ./tell_name.exp
spawn ./greet.sh
What is your name?
```

# Basic commands

| name | function |
| :--- | :------- |
| `spawn <program> [[arg0] arg1 ...]` | Start a program in the background. The output of this process can be `expect`-ed in the script. |
| `expect pattern [command]` <br> &emsp; `[pattern [command] ...]` | Wait for program output that matches `pattern`, and then execute the `command`s.|
| `set timeout <seconds>` | Number of seconds of timeout to use before issuing a timeout condition and continuing to the next command. |


Regular tcl can be used as normal for passing arguments, using conditionals, printing etc.


# Tips

## `expect eof`
*Expect* stops printing the output of the program when there are no more `expect` commands left. This makes the printouts a bit non-intuitive. The solution is to just add 

```tcl
expect eof
```

after the last interaction with the program.

## Timeouts
The global variable `timeout` can be used for setting a timeout for *expect* commands.

```tcl
# Timeout as 1 second
set timeout 1

# No timeout
set timeout -1
```

The following commands will time out if it is configured, and the script will continue.

```tcl
expect {pattern} {command}
# If pattern never matches within the timeout, this line will be executed next
```

### *Expect* does not raise an error upon a timeout
However, one needs to check for a timeout by using the special timeout pattern:

```tcl
expect {pattern} {
    command
} timeout {
    # There was no match against *pattern* within the timeout
    puts "ERROR: No match"
    exit -1
}
```

# Updating script with tips

Let's make a version of the program that takes a bit more time before actually printing anything. So, I added a sleep of 2 seconds:

[**`greet_slow.sh`**](./greet_slow.sh)
```bash
{% include_relative greet_slow.sh -%}
```

## *Expect* script to automate it
The expect script is updated with three things:
1. Setting the timeout from an input argument (so we can play with different timeouts)
1. Checking if a timeout occured when waiting for the input prompt
1. Printing the rest of the output of the program by `expect`-ing `eof`.

[**`tell_name_complete.exp`**](./tell_name_complete.exp)
```tcl
{% include_relative tell_name_complete.exp -%}
```

## Running the program

If we run the program with a timeout that is too short (shorter than the actual time before the input prompt appears) then the script times out:
```console
$ ./tell_name_complete.exp 1
spawn ./greet_slow.sh
Never found the input prompt during the 1 second timeout!
```

However, if we run the program with a longer timeout, then we find the input prompt, *and* print the rest of the program output after the last prompt.
```console
$ ./tell_name_complete.exp 3
spawn ./greet_slow.sh
What is your name? Erasmus
Hello, Erasmus!
```


[likegeeks]: https://likegeeks.com/expect-command/
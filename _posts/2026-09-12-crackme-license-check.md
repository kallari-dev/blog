---
title: Reading a license check without running it
description: A beginner reversing challenge solved by static analysis alone, and what it teaches about trusting client-side checks.
category: writeup
tags: [reversing, ctf, static-analysis]
toc: true
---

This is a writeup of an introductory reversing challenge from a practice platform. The binary asks for a license key and prints either a flag or a refusal. The goal was to solve it without ever running it, to practice reading code instead of poking at it.

## First look

The usual triage comes first: what kind of file is it, and what does it say about itself?

```bash
file license_check
strings -n 6 license_check | less
```

The strings gave away the two outcomes ("Access granted" and "Invalid key") but no flag in plain text. That suggests the flag is built at runtime.

## Finding the decision

In the disassembler, the two messages lead straight to the function that decides between them. Its logic, rewritten as readable pseudocode:

```c
int check(const char *key) {
    if (strlen(key) != 16) return 0;
    int sum = 0;
    for (int i = 0; i < 16; i++) sum += key[i];
    return sum % 97 == 42;
}
```

> The whole "protection" is a checksum. Many keys pass it, and anyone holding the binary can read the rule.
{: .callout .note}

## Why this matters outside CTFs

The same pattern turns up in real software: a check that runs entirely on the user's machine. Whatever the client verifies, the client can be made to skip. Checks that matter belong on a server the user doesn't control.

## Takeaways

- Start with cheap triage: `file`, `strings`, imports.
- Follow the output messages back to the code that chooses between them.
- Rewrite what you read as pseudocode. It's slower, but you understand the program instead of guessing at it.

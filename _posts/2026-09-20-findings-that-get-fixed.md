---
title: Writing findings that actually get fixed
description: A practical structure for vulnerability report findings, so the people who read them can act on them.
category: guide
tags: [reporting, methodology]
toc: true
---

A penetration test is only as useful as its report. The finding that gets fixed is the one a busy developer can understand in two minutes and act on in an afternoon.

## One finding, one problem

Keep each finding to a single root cause. If the same missing check appears on twelve endpoints, that is one finding with twelve affected locations, not twelve findings.

## A structure that works

| Section | What it answers |
|---|---|
| Summary | What is wrong, in one or two sentences |
| Severity | How bad it is, and why |
| Affected | Exactly where it happens |
| Evidence | How you know |
| Remediation | What to change |
| References | Where to read more |

## Severity needs a reason

A label alone invites argument. A label with its reasoning invites a fix.

> State the impact in business terms and the likelihood in technical terms. "Any logged-in user can read other customers' invoices" lands better than a bare score.
{: .callout .warning}

## Remediation should be specific

"Validate input" is not remediation. Name the control, where it goes, and how to check it worked:

```text
Enforce an ownership check in the invoice service before returning a record.
Verify: request another account's invoice ID and confirm a 404.
```

## Before you send it

- Read every finding as the developer who will fix it.
- Remove anything you cannot back with evidence.
- Retest anything older than a few days.

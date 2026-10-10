---
title: Internal network and Active Directory review
description: Assumed-breach assessment starting from a standard employee workstation.
date: 2026-09-05
category: engagement
tags: [active-directory, windows]
status: closed
method: Assumed breach
duration: 1 week
featured: true
sample: true
---

## Scope

One domain and its member servers and workstations, reached from a low-privilege domain account on a standard laptop.

## Approach

- Enumerated the directory to map users, groups, trusts and privileged paths.
- Reviewed group policy, delegation settings and service accounts.
- Validated each privilege path in agreement with the client's team, keeping impact to a minimum.
- Delivered a prioritized hardening plan alongside the findings.

## Findings

- **Critical**: Service account with a weak password and domain-wide privileges
- **High**: Legacy name-resolution protocols enabled on workstations
- **Medium**: Local administrator password reused across machines
- **Info**: Stale computer and user objects in the directory

## Outcome

The client rotated and scoped down the service account, disabled legacy protocols by group policy and rolled out per-machine local administrator passwords.

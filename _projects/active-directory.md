---
title: Internal network and Active Directory review
description: Assumed-breach assessment starting from a standard employee workstation.
order: 2
type: engagement
status: closed
target: active-directory
target_label: Active Directory
method: Assumed breach
duration: 1 week
cover: case_ad
featured: true
sample: true
findings:
  - severity: critical
    title: Service account with a weak password and domain-wide privileges
  - severity: high
    title: Legacy name-resolution protocols enabled on workstations
  - severity: medium
    title: Local administrator password reused across machines
  - severity: info
    title: Stale computer and user objects in the directory
outcome: >-
  The client rotated and scoped down the service account, disabled legacy
  protocols by group policy and rolled out per-machine local administrator
  passwords.
---

## Scope

One domain and its member servers and workstations, reached from a low-privilege domain account on a standard laptop.

## Approach

- Enumerated the directory to map users, groups, trusts and privileged paths.
- Reviewed group policy, delegation settings and service accounts.
- Validated each privilege path in agreement with the client's team, keeping impact to a minimum.
- Delivered a prioritized hardening plan alongside the findings.

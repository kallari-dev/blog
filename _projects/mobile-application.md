---
title: Mobile app for a booking platform
description: Android and iOS client review plus the backend API they talk to.
order: 3
type: engagement
status: closed
target: mobile
target_label: Mobile application
method: Grey box
duration: 10 days
cover: case_mobile
featured: false
sample: true
findings:
  - severity: high
    title: API trusted a role flag sent by the client
  - severity: medium
    title: Sensitive data cached in local storage
  - severity: low
    title: Certificate pinning missing on one API host
outcome: >-
  Role checks moved fully server-side and the local cache was encrypted and
  trimmed. The pinning gap was closed in the next release.
---

## Scope

Release builds of the Android and iOS apps and the API they use, tested with customer and staff test accounts.

## Approach

- Static review of both app packages for secrets, storage and network configuration.
- Dynamic testing through an intercepting proxy on test devices.
- API testing focused on authorization between customer and staff roles.

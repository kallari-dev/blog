---
title: Mobile app for a booking platform
description: Android and iOS client review plus the backend API they talk to.
date: 2026-08-14
category: engagement
tags: [mobile, android, ios, api]
status: closed
method: Grey box
duration: 10 days
featured: false
sample: true
published: false
---

## Scope

Release builds of the Android and iOS apps and the API they use, tested with customer and staff test accounts.

## Approach

- Static review of both app packages for secrets, storage and network configuration.
- Dynamic testing through an intercepting proxy on test devices.
- API testing focused on authorization between customer and staff roles.

## Findings

- **High**: API trusted a role flag sent by the client
- **Medium**: Sensitive data cached in local storage
- **Low**: Certificate pinning missing on one API host

## Outcome

Role checks moved fully server-side and the local cache was encrypted and trimmed. The pinning gap was closed in the next release.

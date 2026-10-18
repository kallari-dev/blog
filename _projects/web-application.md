---
title: Customer portal for a SaaS platform
description: Grey-box test of a multi-tenant web application and its REST API.
date: 2026-10-18
category: engagement
tags:
  - web
  - api
status: active
method: Grey box
duration: 2 weeks
featured: false
sample: true
published: false
stack:
repo:
cover:
---

## Scope

## Approach

## Findings

## Outcome


## Scope

The customer-facing portal and its REST API, tested with two accounts in each of two separate tenants. Production data and third-party integrations were out of scope.

## Approach

- Mapped every endpoint from the client application and the API documentation.
- Compared responses between roles and between tenants for each object type.
- Reviewed session handling across login, logout and password change.
- Prioritized findings by business impact, then wrote remediation the development team could apply directly.

## Findings

- **High**: Missing ownership check exposed other tenants' documents
- **Medium**: Session tokens not invalidated on logout
- **Medium**: Verbose errors revealed framework and library versions
- **Low**: Missing security headers on static assets

## Outcome

All high and medium findings were fixed before release. A retest confirmed the ownership checks now hold across every tenant-scoped endpoint.

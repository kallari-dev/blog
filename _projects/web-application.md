---
title: Customer portal for a SaaS platform
description: Grey-box test of a multi-tenant web application and its REST API.
order: 1
type: engagement
status: closed
target: web
target_label: Web application
method: Grey box
duration: 2 weeks
cover: case_web
featured: true
sample: true
findings:
  - severity: high
    title: Missing ownership check exposed other tenants' documents
  - severity: medium
    title: Session tokens not invalidated on logout
  - severity: medium
    title: Verbose errors revealed framework and library versions
  - severity: low
    title: Missing security headers on static assets
outcome: >-
  All high and medium findings were fixed before release. A retest confirmed
  the ownership checks now hold across every tenant-scoped endpoint.
---

## Scope

The customer-facing portal and its REST API, tested with two accounts in each of two separate tenants. Production data and third-party integrations were out of scope.

## Approach

- Mapped every endpoint from the client application and the API documentation.
- Compared responses between roles and between tenants for each object type.
- Reviewed session handling across login, logout and password change.
- Prioritized findings by business impact, then wrote remediation the development team could apply directly.

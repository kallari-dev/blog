---
title: A tiny generator for consistent finding templates
description: A small Python script that turns a YAML file of findings into Markdown sections with the same structure every time.
date: 2026-07-20
category: coding
tags: [python, tooling, reporting]
status: active
stack: Python · YAML
featured: true
sample: true
---

Copying the previous report and editing it is how inconsistencies creep in. This project keeps findings as data and renders them the same way every time.

## The input

Each finding is a short YAML entry:

```yaml
- title: Missing ownership check on invoices
  severity: high
  affected: [/api/invoices/{id}]
  summary: Any authenticated user can read invoices belonging to other accounts.
  remediation: Check that the invoice belongs to the caller before returning it.
```

## The script

```python
import sys
import yaml

ORDER = ["critical", "high", "medium", "low", "info"]

def render(finding):
    lines = [
        f"## {finding['title']}",
        f"**Severity:** {finding['severity'].capitalize()}",
        "",
        finding["summary"],
        "",
        "**Affected:** " + ", ".join(f"`{a}`" for a in finding["affected"]),
        "",
        f"**Remediation:** {finding['remediation']}",
    ]
    return "\n".join(lines)

def main(path):
    with open(path) as f:
        findings = yaml.safe_load(f)
    findings.sort(key=lambda x: ORDER.index(x["severity"]))
    print("\n\n".join(render(x) for x in findings))

if __name__ == "__main__":
    main(sys.argv[1])
```

> [!danger]
> `yaml.safe_load` matters here: plain `yaml.load` can build arbitrary Python objects from the input file.

## What's next

- A JSON schema to catch missing fields before rendering.
- An option to export a summary table by severity.

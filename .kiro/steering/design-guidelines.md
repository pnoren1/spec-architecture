---
inclusion: auto
---

# Design Phase Guidelines

When working on the **design** phase of a spec, follow these guidelines:

## Decision Making — Ask, Don't Decide
- When there are multiple viable approaches or alternatives for a solution, **present the options to the user and ask which they prefer** instead of choosing one and presenting it as final.
- For each alternative, provide a clear breakdown:
  - **Why choose this option** — the main reasoning and use cases where it shines
  - **Pros** — specific advantages
  - **Cons** — specific disadvantages or risks
- This allows the user to make an informed decision based on full context.

## Reference Relevant Context Files
- Before proposing a design, check for relevant documentation, specs, architecture files, or context files in the workspace that may inform the design.
- If such files exist, reference them explicitly and explain how they influenced the proposed design.
- Specifically look for these files in the repo structure:
  - `docs/context/service-context.md` — AI entry point for the service
  - `docs/specs/service-spec.md` — service-level specification
  - `docs/specs/features/*.md` — existing feature specs
  - `docs/architecture.md` — service architecture and design decisions
  - `docs/code-map.md` — source code structure and key files

## Method/Function Annotations — New vs Existing
- For every method or function mentioned in the design, clearly indicate whether it is:
  - 🆕 **New** — needs to be created
  - ✏️ **Existing (modified)** — already exists but requires changes
  - ✅ **Existing (unchanged)** — already exists and will be used as-is

## Cross-Service Impact Analysis
- When a feature or change may affect multiple services, include an **Affected Services** table in the design:
  - Service name
  - Type of change (new code / modified / config only / no change)
  - Brief description of what changes in that service
- Do not focus only on the current service — consider upstream and downstream dependencies.

## Link, Don't Duplicate
- When referencing existing specs, architecture docs, or contracts, use `#[[file:relative/path.md]]` links instead of copying content.
- Never duplicate information that already exists in other spec or doc files.

## Classify the Change Type
- At the beginning of the design, identify and state the type of change:
  - 🟢 **Feature Spec** — new capability requiring detailed planning
  - 🟡 **Change Request / Bug Fix** — small behavioral change or fix
  - 🔵 **Proposal / RFC** — exploratory, not yet approved
- This classification determines where the spec should be stored and how it should be managed.

## Follow System Conventions
- Ensure the design adheres to conventions defined in the System SPEC and service architecture, including:
  - Event naming: `<domain>.<past-tense-verb>` (e.g. `user.created`, `email.delivered`)
  - Event schema: all events must include `eventId`, `timestamp`, `source`
  - API versioning: URL path prefix (`/v1/`, `/v2/`)
  - Error responses: RFC 7807 Problem Details format
  - Logging: structured JSON with `correlationId`
- If the workspace has a System SPEC or team standards doc, check it before proposing new patterns.

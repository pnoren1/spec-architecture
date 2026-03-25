# Prompt: Generate Workspace-Level Documentation

You are an AI assistant tasked with generating the **workspace-level `docs` folder** inside a dedicated documentation folder or repository within a multi-repo workspace.

This prompt follows the multi-repo documentation methodology. It supports all three workspace types defined by the methodology: **System**, **Team/Domain**, and **Feature**. The workspace type determines what documentation is generated.

## Prerequisites

This prompt expects to run inside a **dedicated, physical folder or repository** (e.g., `system-docs/`, `team-payments/`, `feature-user-onboarding/`) that has been added to the workspace alongside the other repositories. In a VS Code multi-root workspace, the workspace root is virtual and cannot contain new files — so the workspace-level documentation must live in its own folder/repo.

**Before running this prompt, the user must:**
1. Create a folder or initialize a repository for the workspace docs (e.g., `system-docs/`).
2. Add it to the workspace (if using a multi-root workspace).
3. Run this prompt with that folder as the working context.

---

## Step 0: Pre-flight Checks

1. **Verify you are running inside a dedicated workspace-docs folder** — not at the virtual workspace root. The current directory should be a physical folder that is a peer to the other repositories in the workspace. If this is unclear, ask the user to confirm which folder should hold the workspace-level documentation.

2. **Check for existing documentation at the target sub-path.**
   Since a single `docs/` folder holds all workspace types, the check depends on what the user is generating:
   - **System:** check if `docs/architecture/` and `docs/specs/system-spec.md` already exist.
   - **Team/Domain:** check if `docs/teams/{{TEAM_NAME}}/` already exists (after the team name is known from Step 2).
   - **Feature:** check if `docs/features/{{FEATURE_NAME}}/` already exists (after the feature name is known from Step 2).

   If the target sub-path already exists — **STOP and inform the user:**
   - "Documentation for this [system / team / feature] already exists at `<path>`."
   - Suggest options:
     1. Delete the existing sub-path and regenerate.
     2. Abort.
   - **Wait for the user's explicit choice before proceeding.**

   If `docs/` exists but the target sub-path does not — proceed normally. The new docs will be added alongside the existing ones.

3. **Identify the peer repositories.** These are the other folders/repositories in the workspace alongside the current one.

---

## Step 1: Determine Workspace Type

**Ask the user to choose the workspace type:**

> What type of workspace is this? Choose one:
>
> 1. **System** — Source of truth for the entire system. Stable, long-lived, not tied to a specific team or feature.
> 2. **Team / Domain** — Source of truth for services owned by a specific team. Stable, tied to a team or domain.
> 3. **Feature** — Temporary working space for developing a feature or initiative. Cross-team, cross-service, time-limited.

**Wait for the user's response before proceeding.**

Store the answer as `{{WORKSPACE_TYPE}}` (one of: `system`, `team/domain`, `feature`).

---

## Step 2: Gather Context from the User

### Common Questions (ask for ALL workspace types)

These questions apply regardless of workspace type. Present them together with the type-specific questions below.

1. **What is this system/workspace for?** — Describe the business domain or product in one or two sentences. (e.g., "A notification platform that sends transactional emails based on system events.")
2. **What is the main business flow?** — Describe the primary end-to-end process the system supports. For Feature workspaces, describe the feature's flow specifically. (e.g., "A user signs up → a welcome notification is created → an email is sent → delivery is tracked.")
3. **Is there anything else you'd like captured?** — Any terminology, constraints, business rules, or context that wouldn't appear in the per-repo docs. You can also point to existing files in the workspace (e.g., PRDs, design docs, API specs, architecture diagrams) — just provide the file paths and the prompt will read and incorporate their content. (Optional.)

Store the answers as:
- `{{BUSINESS_DOMAIN}}` — used in overview documents and specs
- `{{MAIN_FLOW}}` — used in flow descriptions. For Feature workspaces, this also serves as the feature's end-to-end flow.
- `{{ADDITIONAL_CONTEXT}}` — free-text context, used wherever relevant
- `{{REFERENCE_FILES}}` — list of file paths the user pointed to. If provided, read each file and extract relevant information to enrich the generated documentation. Treat these files as additional input alongside the per-repo docs.

### Additional Questions by Workspace Type

**If `{{WORKSPACE_TYPE}}` is `system`:**

No additional questions.

**If `{{WORKSPACE_TYPE}}` is `team/domain`:**

4. **Which services does this team/domain own?** — List the service names. The prompt will look for their repos in the workspace.

Store the additional answers as:
- `{{OWNED_SERVICES}}` — list of service names to filter repos

> Note: The team/domain name is derived from `{{BUSINESS_DOMAIN}}` (common question 1) or from the workspace folder name. Team/domain-specific conventions are captured in `{{ADDITIONAL_CONTEXT}}` (common question 3).

**If `{{WORKSPACE_TYPE}}` is `feature`:**

4. **Which services are affected?** — List the service names that need changes.

Store the additional answers as:
- `{{AFFECTED_SERVICES}}`

> Note: The feature name and description are derived from `{{BUSINESS_DOMAIN}}` (common question 1). The feature flow is `{{MAIN_FLOW}}` (common question 2). Additional context and open questions are captured in `{{ADDITIONAL_CONTEXT}}` (common question 3).

**Present all questions (common + type-specific) at once. Wait for the user's response before proceeding.**

---

## Step 3: Discover Repositories

Scan the workspace for all peer repositories (other folders alongside the current workspace-docs folder). Exclude the current folder itself. A directory is a repository if it contains any of:
- A `docs/` folder (per the methodology)
- A `src/` folder
- A `package.json`, `*.csproj`, `*.sln`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `pyproject.toml`, `setup.py`, `*.tf`, or similar project files
- A `.git/` folder

List all discovered repositories and their actual paths.

**For Team/Domain workspaces:** Filter the discovered repos to include only those matching `{{OWNED_SERVICES}}`. If a service listed by the user is not found in the workspace, flag it with `<!-- TODO: repo not found in workspace -->`.

**For Feature workspaces:** Identify repos matching `{{AFFECTED_SERVICES}}`. If a service listed by the user is not found, flag it.

---

## Step 4: Extract Information from Per-Repo Documentation

**This step applies to System and Team/Domain workspaces only.** For Feature workspaces, skip to Step 5.

For each relevant repository, read the following files **in this priority order**. If a file doesn't exist, skip it and move to the next.

### Primary Sources (methodology-defined docs)

| Priority | File | What to Extract |
|---|---|---|
| 1 | `docs/context/service-context.md` | **AI entry point.** Quick Context (responsibility, events, APIs, dependencies) and links to all other docs. Often sufficient for aggregation. |
| 2 | `docs/specs/service-spec.md` | Events with schemas, APIs with full endpoints, dependencies with types, internal components. |
| 3 | `docs/repo-overview.md` | Purpose, domain, tech stack, responsibility boundaries |
| 4 | `docs/architecture.md` | Design decisions, interaction patterns, flows |
| 5 | `docs/code-map.md` | Tech stack details |
| 6 | `docs/specs/features/*.md` | Feature names and summaries |

### Secondary Sources (if primary docs don't exist)

If a repository has no `docs/` folder at all, try to extract minimal information from:

| File | What to Extract |
|---|---|
| `package.json` | Name, description, dependencies |
| `*.csproj` / `*.sln` | Project name, target framework |
| `README.md` | Purpose, description |
| `.kiro/steering/*.md` | Architecture info, patterns |
| `.kiro/specs/**/*.md` | Spec information |

If even these don't exist, include the repository in the services index with a `<!-- TODO: documentation missing -->` marker.

**You must NOT scan source code.** All technical information should be extracted from documentation and configuration files only.

---

## Step 5: Build the Aggregated View

### For System Workspaces

Build a unified picture from all discovered repos:

**5.1 Services Table** — all services with their responsibilities and domains.

**5.2 Event Bus Map** — aggregate all "Events Produced" and "Events Consumed" into a single table:
- Event name, Producer, Consumers, Schema (if available)
- Cross-validate: if service A produces event X, check that at least one other service consumes it (and vice versa). Flag inconsistencies with `<!-- WARNING: inconsistency detected -->`.

**5.3 API Map** — aggregate all synchronous APIs:
- Endpoint (method + path), Provider, Consumers (derived from dependencies)

**5.4 Dependency Graph** — from each service's dependencies, build a map of service-to-service dependencies (sync and async).

**5.5 Main Flows** — use `{{MAIN_FLOW}}` as the primary flow, supplement with flows discovered in repo docs.

### For Team/Domain Workspaces

Build a team/domain-scoped view from the owned repos:

**5.1 Team/Domain Services Table** — services owned by the team/domain with responsibilities.

**5.2 Team/Domain Event Map** — events produced and consumed by the team/domain's services. Include events from external services only as references (inbound/outbound).

**5.3 Team/Domain API Map** — APIs exposed by the team/domain's services and APIs consumed from other teams/domains.

**5.4 Internal Dependencies** — dependencies between the team/domain's own services and dependencies on external services.

### For Feature Workspaces

No aggregation from repo docs is needed. The content comes from the user's answers in Step 2. However, for each affected service, check if its `docs/specs/service-spec.md` exists and extract:
- Current events and APIs relevant to the feature
- Current responsibilities that may be affected

This helps identify gaps between the current state and the desired feature.

---

## Step 6: Generate the Workspace `docs` Folder

A single `docs/` folder holds documentation for all workspace types in a unified hierarchy. This mirrors the pattern used inside repositories, where `service-spec.md` and `features/*.md` coexist under `docs/specs/`. Similarly, at the workspace level, system-level docs, team/domain docs, and feature docs all live together — each in its own sub-path.

The workspace type (`{{WORKSPACE_TYPE}}`) determines which parts of the hierarchy are generated in this run, but the structure is designed so that additional types can be added later without reorganization.

---

### Unified Folder Structure

```
docs/
├── architecture/
│   ├── system-overview.md          ← System
│   └── services-index.md          ← System / Team/Domain
│
├── specs/
│   └── system-spec.md             ← System
│
├── teams/
│   └── <team-name>/
│       ├── team-overview.md       ← Team/Domain
│       └── services-index.md      ← Team/Domain
│
├── features/
│   └── <feature-name>/
│       └── feature-overview.md    ← Feature
│
├── workspace.yaml
└── README.md
```

### What Gets Generated Per Workspace Type

**System** generates:
- `docs/architecture/system-overview.md`
- `docs/architecture/services-index.md`
- `docs/specs/system-spec.md`
- `docs/workspace.yaml`
- `docs/README.md`

**Team/Domain** generates:
- `docs/teams/{{TEAM_NAME}}/team-overview.md`
- `docs/teams/{{TEAM_NAME}}/services-index.md`
- Updates `docs/workspace.yaml` (adds team entry if file already exists)
- Updates `docs/README.md` (adds link to team docs if file already exists)

**Feature** generates:
- `docs/features/{{FEATURE_NAME}}/feature-overview.md`
- Updates `docs/workspace.yaml` (adds feature entry if file already exists)
- Updates `docs/README.md` (adds link to feature docs if file already exists)

> **Note:** If `docs/` already exists from a previous run (e.g., system docs were generated first), the prompt should add the new type's files into the existing structure rather than overwriting. The pre-flight check in Step 0 should be adjusted: instead of stopping when `docs/` exists, check whether the specific sub-path for the requested type already exists (e.g., `docs/teams/{{TEAM_NAME}}/` or `docs/features/{{FEATURE_NAME}}/`). If that sub-path exists, stop and ask the user. If `docs/` exists but the sub-path doesn't, proceed normally.

---

# File Specifications — All Workspace Types

## Common Files (generated for every workspace type)

### `docs/workspace.yaml`

Since a single `docs/` folder can hold system, team/domain, and feature documentation, `workspace.yaml` tracks all registered scopes.

```yaml
name: <workspace-name>

system:
  owner: <"system" or org-level owner>

teams:
  - name: <team-name>
    owner: <team-owner>
  - name: <team-name-2>
    owner: <team-owner-2>

features:
  - name: <feature-name>
    owner: <feature-owner or requesting team>
    status: <active | completed | archived>
  - name: <feature-name-2>
    owner: <feature-owner-2>
    status: <active | completed | archived>
```

- When generating System docs: populate the `system` section and `name`. Create the `teams` and `features` sections as empty arrays (`teams: []`, `features: []`).
- When generating Team/Domain docs: add an entry to the `teams` array. If the file doesn't exist yet, create it with the `system` section empty and `features` as an empty array.
- When generating Feature docs: add an entry to the `features` array. If the file doesn't exist yet, create it with the `system` section empty and `teams` as an empty array.

### `docs/README.md`

```markdown
# <Workspace Name>

Owner: <owner>
Scope: <short description>

## Documentation Index

### System
- [System Overview](architecture/system-overview.md)
- [Services Index](architecture/services-index.md)
- [System Spec](specs/system-spec.md)

### Teams
- [<team-name>](teams/<team-name>/team-overview.md)

### Features
- [<feature-name>](features/<feature-name>/feature-overview.md)
```

Each section is populated only when the corresponding docs exist. When adding a new team or feature, append a link to the relevant section. If the README doesn't exist yet, create it with only the sections relevant to the current generation.

---

# File Specifications — System Workspace

## `docs/architecture/system-overview.md`

This file provides a high-level view of the entire system. A reader should understand the system **without opening any repository**.

**Must include:**

- **System name** (derive from workspace name or common naming across repos)
- **Business Domain** — use `{{BUSINESS_DOMAIN}}` as the foundation, enriched with details from per-repo docs
- **System Boundaries** — inbound, outbound, internal, and external consumers
- **Domains** — table mapping domains to services
- **Services table** — all services with their responsibilities
- **Main Flows** — step-by-step descriptions of key cross-service flows
- **Event Bus table** — all events, producers, and consumers
- **APIs (Synchronous) table** — all inter-service API calls
- **Architecture Diagram** — a text-based or mermaid diagram showing service interactions

**Template:**

```markdown
# System Overview — <System Name>

## Business Domain

{{BUSINESS_DOMAIN}} — <Supplement with details derived from per-repo docs>

## System Boundaries

- Inbound: <external inputs to the system>
- Outbound: <external outputs from the system>
- Internal: <inter-service communication methods>
- External Consumers: <who reads from the system>

## Domains

| Domain | Services |
|---|---|
| <domain> | <service>, <service> |

## Services

| Service | Responsibility |
|---|---|
| <service-name> | <responsibility> |

## Main Flows

### <Primary Flow — derived from {{MAIN_FLOW}}>

1. <step>
2. <step>
...

### <Additional Flow — derived from repo docs>

1. <step>
2. <step>
...

## Event Bus

| Event | Producer | Consumers |
|---|---|---|
| `<event.name>` | <service> | <service>, <service> |

## APIs (Synchronous)

| Endpoint | Service | Consumers |
|---|---|---|
| `<METHOD /path>` | <service> | <service> |

## Architecture Diagram

<text-based or mermaid diagram>
```

---

## `docs/architecture/services-index.md`

A detailed registry of every service/repo in the workspace.

**For each repository, include:**

- Service/repo name
- Domain
- Location (relative path in workspace)
- AI Entry point (`docs/context/service-context.md` path)
- Service Spec path (`docs/specs/service-spec.md` path)
- Responsibility (one line)
- Events Produced (comma-separated list)
- Events Consumed (comma-separated list)
- APIs exposed (comma-separated list, or "None")
- Dependencies (other services it depends on)
- Feature specs (list of feature spec files found)

**Template for each entry:**

```markdown
### <service-name>
- **Domain:** <domain>
- **Location:** `<relative-path>/`
- **AI Entry:** `<relative-path>/docs/context/service-context.md`
- **Service Spec:** `<relative-path>/docs/specs/service-spec.md`
- **Responsibility:** <one line>
- **Events Produced:** `<event1>`, `<event2>`
- **Events Consumed:** `<event1>`, `<event2>`
- **APIs:** `<METHOD /path>`, `<METHOD /path>` (or "None")
- **Dependencies:** <service-a> (HTTP), <service-b> (Event Bus)
- **Feature Specs:**
  - `<relative-path>/docs/specs/features/<feature>.md`
```

---

## `docs/specs/system-spec.md`

The system-level spec that defines how the system works as a whole.

**Must include:**

- **System Requirements** — Functional Requirements and Non-Functional Requirements
- **Architecture Overview** — communication model, event bus, data ownership, contract versioning
- **Service Boundaries** — table showing each service and what it owns
- **Major Events** — table with event name, schema (fields), and producer
- **Inter-Service APIs** — table with endpoint, provider, consumers, and description
- **Architectural Decisions** — table with Decision, Choice, and Rationale
- **Standards & Conventions** — event naming, schema requirements, API versioning, error format, logging, health checks
- **Architecture Principles** — key principles the system follows
- **Consistency Notes** — any inconsistencies found during aggregation

**Template:**

```markdown
# System Specification — <System Name>

> {{ADDITIONAL_CONTEXT}} <!-- Include if the user provided additional context -->

## System Requirements

### Functional Requirements
- <requirement derived from repo docs and user context>

### Non-Functional Requirements
- <requirement derived from patterns observed across repos>

## Architecture Overview

- Communication model: <sync/async patterns>
- Event bus: <technology>
- Data ownership: <strategy>
- Contract versioning: <approach>

## Service Boundaries

| Service | Boundary |
|---|---|
| <service> | <what it owns and is responsible for> |

## Major Events

| Event | Schema | Producer |
|---|---|---|
| `<event>` | `{ field1, field2, ... }` | <service> |

## Inter-Service APIs

| Endpoint | Provider | Consumers | Description |
|---|---|---|---|
| `<METHOD /path>` | <service> | <service> | <description> |

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| <decision> | <choice> | <rationale> |

## Standards & Conventions

- <standard derived from repo docs>

## Architecture Principles

- **<Principle Name>:** <description>

## Consistency Notes

- <any inconsistencies found>
<!-- If no inconsistencies: "No inconsistencies detected." -->
```


---

# File Specifications — Team/Domain Workspace

## `docs/teams/{{TEAM_NAME}}/team-overview.md`

Overview of the team/domain's responsibilities.

**Must include:**

- Team/domain name
- Team/domain scope and responsibilities
- List of owned services with one-line descriptions
- Key flows within the team/domain
- Interfaces with other teams/domains (events and APIs consumed/produced that cross team/domain boundaries)
- Team/domain-specific conventions or standards (from `{{ADDITIONAL_CONTEXT}}`)

**Template:**

```markdown
# Team Overview — {{BUSINESS_DOMAIN}}

## Business Domain

{{BUSINESS_DOMAIN}}

## Scope

<What this team/domain owns and is responsible for within the business domain above>

## Owned Services

| Service | Responsibility | Location |
|---|---|---|
| <service> | <responsibility> | `<relative-path>/` |

## Key Flows

### <Primary Flow — derived from {{MAIN_FLOW}}, scoped to this team/domain's services>

1. <step>
2. <step>
...

### <Additional Flow>

1. <step>
2. <step>
...

## External Interfaces

### Events Produced (consumed by other teams/domains)

| Event | Producer | External Consumers |
|---|---|---|
| `<event>` | <service> | <external-service> |

### Events Consumed (from other teams/domains)

| Event | External Producer | Consumer |
|---|---|---|
| `<event>` | <external-service> | <service> |

### APIs Exposed (called by other teams/domains)

| Endpoint | Service | External Consumers |
|---|---|---|
| `<METHOD /path>` | <service> | <external-service> |

### APIs Consumed (from other teams/domains)

| Endpoint | External Service | Consumer |
|---|---|---|
| `<METHOD /path>` | <external-service> | <service> |

## Team/Domain Conventions

{{ADDITIONAL_CONTEXT}}
```

---

## `docs/teams/{{TEAM_NAME}}/services-index.md`

Same format as the System Workspace `docs/architecture/services-index.md`, but scoped to the team/domain's services only.

**For each owned service, include:**

- Service name
- Domain
- Location (relative path)
- AI Entry point
- Service Spec path
- Responsibility
- Events Produced
- Events Consumed
- APIs
- Dependencies
- Feature Specs

Use the same template as the System Workspace `services-index.md` (see above).

---

# File Specifications — Feature Workspace

## `docs/features/{{FEATURE_NAME}}/feature-overview.md`

Working document for the feature/initiative.

**Must include:**

- Feature name and description
- End-to-end flow
- Affected services — table with service name, what changes are needed, and link to the service's repo/spec
- Gaps and required changes — what's missing or needs to be modified
- Open questions
- Additional context from `{{ADDITIONAL_CONTEXT}}`

**Important:** This document must **link** to existing service SPECs and repos, not duplicate their content. Use relative paths or note the repo names for the user to navigate to.

**Template:**

```markdown
# Feature Overview — {{BUSINESS_DOMAIN}}

## Business Domain

{{BUSINESS_DOMAIN}}

## Description

<Derived from the user's answer to "What is this system/workspace for?" — expand with details from referenced files if provided>

## End-to-End Flow

> Main system flow for reference: {{MAIN_FLOW}}

{{MAIN_FLOW}}

1. <step — include which service is responsible>
2. <step>
...

## Affected Services

| Service | Required Changes | Current Spec |
|---|---|---|
| <service> | <what needs to change> | `<relative-path>/docs/specs/service-spec.md` or <!-- TODO: repo not in workspace --> |

## Gaps & Required Changes

### <service-name>

- <gap or change needed>
- <new event / API / handler required>

### <service-name>

- <gap or change needed>

## Open Questions

- <question>
- <question>

## Additional Context

{{ADDITIONAL_CONTEXT}}
```

---

# Execution Steps Summary

1. Verify you are inside a dedicated workspace-docs folder. After determining the workspace type and name (Steps 1–2), check if the target sub-path already exists. If yes — stop and ask user.
2. **Ask the user for workspace type** (system / team/domain / feature). Wait for response.
3. **Ask the user for context** based on the workspace type. Wait for response.
4. Discover all peer repositories in the workspace.
5. For System/Team/Domain: read documentation files from relevant repos in priority order. **Do NOT read source code.**
6. For System/Team/Domain: aggregate into unified views (services, events, APIs, flows). For Feature: extract current state of affected services.
7. For System: cross-validate events and APIs for inconsistencies.
8. Generate files for the chosen workspace type into the unified `docs/` folder. If `docs/` already exists (from a previous type), add the new files alongside existing ones and update `workspace.yaml` and `README.md`.
9. Report: list what was generated and flag any repos with missing or incomplete documentation.

---

# Important Rules

1. **Do NOT scan source code.** All information must come from per-repo documentation files (`docs/` folder contents), project configuration files, or `.kiro/` files.
2. **Write real content, not placeholders.** Every generated file must contain actual information derived from the repositories and user input.
3. **If information is missing**, write what you can determine and mark gaps with `<!-- TODO: verify -->` or `<!-- TODO: missing from <repo-name> docs -->`.
4. **Use English** for all generated documentation.
5. **Do not modify** any files inside the other repositories. Only create files under the `docs/` folder in the current workspace-docs folder.
6. **Flag inconsistencies** — if service A produces an event that no other service consumes, or if service B calls an API that no service exposes, note this in the system spec or team/domain overview.
7. **Paths to repo documentation** — use the actual paths as discovered in Step 3. Do not assume a fixed directory structure.
8. **Feature workspaces must link, not duplicate** — always reference existing service SPECs and repos instead of copying their content.

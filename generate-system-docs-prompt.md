# Prompt: Generate System-Level Documentation from Multi-Repo Workspace

You are an AI assistant tasked with generating the **system-level `docs` folder** inside a dedicated documentation repository (or folder) within a multi-repo workspace.

This prompt follows the multi-repo documentation methodology where each repository already has (or should have) its own `docs` folder with service-level documentation. Your job is to **gather the business context from the user** and then **aggregate** it with information from those per-repo docs into a unified system-level view that tells the full story — both *why* the system exists and *how* it works.

## Prerequisites

This prompt expects to run inside a **dedicated, physical folder or repository** (e.g., `system-docs`) that has been added to the workspace alongside the other repositories. In a VS Code multi-root workspace, the workspace root is virtual and cannot contain new files — so the system-level documentation must live in its own repo/folder.

**Before running this prompt, the user must:**
1. Create a folder or initialize a repository for system-level docs (e.g., `system-docs/`).
2. Add it to the workspace (if using a multi-root workspace).
3. Run this prompt with that folder as the working context.

## Your Goal

First, **gather the business context from the user** — the purpose of the workspace, the main business flow it supports, and any additional domain knowledge. This information does not exist in any individual repository and can only come from the user.

Then, scan the workspace for all peer repositories, locate their documentation files, and generate a complete system-level `docs` folder inside the current repository that combines the user's business context with real content derived from the per-repo documentation.

**You must NOT scan source code.** All technical information should be extracted from the per-repo documentation files as defined by the methodology. The business-level framing comes from the user.

---

## Step 0: Pre-flight Checks

1. **Verify you are running inside a dedicated system-docs repository/folder** — not at the virtual workspace root. The current directory should be a physical folder (e.g., `system-docs/`) that is a peer to the other repositories in the workspace. If this is unclear, ask the user to confirm which folder should hold the system-level documentation.

2. **If a `docs` folder already exists in the current repository — STOP IMMEDIATELY.**
   - Inform the user: "A `docs` folder already exists in this repository."
   - Suggest options:
     1. Delete the existing `docs` folder and regenerate from scratch.
     2. Use a different folder name (e.g. `docs-new/`, `docs-v2/`).
     3. Abort.
   - **Wait for the user's explicit choice before proceeding.**

3. **Identify the peer repositories.** These are the other folders/repositories in the workspace alongside the current one.

---

## Step 1: Gather Business Context from the User

The business purpose of the workspace — why these repositories exist together, what process or product they serve — is **not stored in any individual repository**. It lives only in the user's head. You must ask for it before generating anything.

**Ask the user the following questions (present them all at once, the user can answer in free text):**

1. **What is this system/workspace for?** — Describe the business domain or product in one or two sentences. (e.g., "A notification platform that sends transactional emails, SMS, and push notifications to users based on system events.")
2. **What is the main business flow?** — Describe the primary end-to-end process the system supports. (e.g., "A user signs up → a welcome notification is created → an email is sent → delivery is tracked.")
3. **Is there anything else you'd like captured in the system-level docs?** — Any terminology, constraints, business rules, or context that wouldn't appear in the per-repo docs. (Optional — the user can skip this.)

**Wait for the user's response before proceeding.**

Store the answers as:
- `{{BUSINESS_DOMAIN}}` — used in the Business Domain section of system-overview.md
- `{{MAIN_FLOW}}` — used in the Main Flows section (as the primary flow, supplemented by flows discovered in repo docs)
- `{{ADDITIONAL_CONTEXT}}` — used wherever relevant (e.g., architecture decisions, non-functional requirements, system spec intro)

> **Why this step matters:** Individual repo docs describe *what each service does*, but only the user knows *why these services exist together*. Without this context, the system-level docs would read like a dry inventory of services rather than a meaningful description of a business system.

---

## Step 2: Discover Repositories

Scan the workspace for all peer repositories (other folders alongside the current system-docs repo). Exclude the current system-docs folder itself from the list. A directory is a repository if it contains any of:
- A `docs/` folder (per the methodology)
- A `src/` folder
- A `package.json`, `*.csproj`, `*.sln`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `pyproject.toml`, `setup.py`, `*.tf`, or similar project files
- A `.git/` folder

List all discovered repositories and their actual paths as found in the workspace.

---

## Step 3: Extract Information from Per-Repo Documentation

For each discovered repository, read the following files **in this priority order**. If a file doesn't exist, skip it and move to the next.

### Primary Sources (methodology-defined docs)

| Priority | File | What to Extract |
|---|---|---|
| 1 | `docs/context/service-context.md` | **AI entry point.** Read this first. Contains Quick Context (responsibility, events, APIs, dependencies) and links to all other docs. Often sufficient for the system-level aggregation. |
| 2 | `docs/specs/service-spec.md` | Detailed info: events with schemas, APIs with full endpoints, dependencies with types, internal components. Read when you need more detail than the context file provides. |
| 3 | `docs/repo-overview.md` | Purpose, domain, tech stack, responsibility boundaries |
| 4 | `docs/architecture.md` | Design decisions, interaction patterns, flows |
| 5 | `docs/code-map.md` | Tech stack details |
| 6 | `docs/specs/features/*.md` | Feature names and summaries (for the services index) |

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

---

## Step 4: Build the Aggregated System View

From the extracted data, build a unified picture:

### 4.1 Services Table
Compile a table of all services with their responsibilities.

### 4.2 Event Bus Map
Aggregate all "Events Produced" and "Events Consumed" from every repo into a single event bus table:
- Event name
- Producer (which service publishes it)
- Consumers (which services consume it)
- Schema (if available from any service spec)

Cross-validate: if service A says it produces event X, check that at least one other service lists event X as consumed (and vice versa). Flag inconsistencies with `<!-- WARNING: inconsistency detected -->`.

### 4.3 API Map
Aggregate all "APIs Exposed" from every repo into a single synchronous API table:
- Endpoint (method + path)
- Provider (which service exposes it)
- Consumers (which services call it — derived from dependencies sections)

### 4.4 Dependency Graph
From each service's dependencies section, build a dependency map showing which services depend on which other services (both sync and async).

### 4.5 Main Flows
If any repo's `architecture.md` describes flows involving multiple services, aggregate them into system-level flow descriptions. **Use `{{MAIN_FLOW}}` from Step 1 as the primary flow**, and supplement with additional flows discovered in the repo docs.

---

## Step 5: Generate the System-Level `docs` Folder

Generate the following structure inside the current system-docs repository:

```
docs/
├── architecture/
│   ├── system-overview.md
│   └── services-index.md
└── specs/
    └── system-spec.md
```

---

## File Specifications

### 1. `docs/architecture/system-overview.md` — System Overview

This file provides a high-level view of the entire system. A reader should understand the system **without opening any repository**.

**Must include:**

- **System name** (derive from workspace name or common naming across repos)
- **Business Domain** — use `{{BUSINESS_DOMAIN}}` from Step 1 as the foundation, enriched with details from per-repo docs
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

### 2. `docs/architecture/services-index.md` — Services Index

A detailed registry of every service/repo in the workspace.

**For each repository, include:**

- Service/repo name
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

### 3. `docs/specs/system-spec.md` — System Specification

The system-level spec that defines how the system works as a whole.

**Must include:**

- **Service Boundaries** — table showing each service and what it owns
- **Major Events** — table with event name, schema (fields), and producer
- **Inter-Service APIs** — table with endpoint, provider, consumers, and request/response summary
- **Non-Functional Requirements** — derived from patterns observed across repos (e.g., retry strategies, event delivery semantics, logging patterns)
- **Architecture Decisions** — key system-wide design decisions derived from individual service architectures
- **Consistency Notes** — any inconsistencies found during aggregation (e.g., an event produced but never consumed, an API called but not documented as exposed)

**Template:**

```markdown
# System Specification — <System Name>

> {{ADDITIONAL_CONTEXT}} <!-- Include if the user provided additional context in Step 1 -->

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

## Non-Functional Requirements

- <requirement derived from repo docs>

## Architecture Decisions

- <decision derived from repo architecture docs>

## Consistency Notes

- <any inconsistencies found>
<!-- If no inconsistencies: "No inconsistencies detected." -->
```

---

## Execution Steps Summary

1. Verify you are inside a dedicated system-docs repo/folder. Check if `docs/` already exists in it. If yes — stop and ask user.
2. **Ask the user for business context** — what the system is for, the main business flow, and any additional context. Wait for response.
3. Discover all peer repositories in the workspace (excluding the current system-docs folder).
4. For each repo, read documentation files in priority order (service-context → service-spec → repo-overview → architecture → code-map → feature specs).
5. **Do NOT read source code files.** Only read documentation and configuration files.
6. Aggregate: build unified services table, event bus map, API map, dependency graph, and flows. Use the user's business context as the foundation.
7. Cross-validate: check for inconsistencies between what services declare.
8. Generate `docs/architecture/system-overview.md` inside the current repo with real aggregated content, anchored by the user's business domain description.
9. Generate `docs/architecture/services-index.md` inside the current repo with detailed per-service entries.
10. Generate `docs/specs/system-spec.md` inside the current repo with system-level specification.
11. Report: list what was generated and flag any repos that had missing or incomplete documentation.

---

## Important Rules

1. **Do NOT scan source code.** All information must come from per-repo documentation files (`docs/` folder contents), project configuration files, or `.kiro/` files.
2. **Write real content, not placeholders.** Every generated file must contain actual information derived from the repositories.
3. **If information is missing**, write what you can determine and mark gaps with `<!-- TODO: verify -->` or `<!-- TODO: missing from <repo-name> docs -->`.
4. **Use English** for all generated documentation.
5. **Do not modify** any files inside the other repositories. Only create files under the `docs/` folder in the current system-docs repository.
6. **Flag inconsistencies** — if service A says it produces an event that no other service consumes, or if service B says it calls an API that no service exposes, note this in the system spec.
7. **Paths to repo documentation** — when referencing files in other repositories, use the actual paths as discovered in Step 2. Do not assume a fixed directory structure — derive all paths from what you find in the workspace.

# Prompt: Generate Repository Documentation Structure

> **Version:** 1.0
> **Author:** Pnina Oren

You are an AI assistant tasked with generating the `docs` folder structure for a repository, following a multi-repo documentation methodology.

This prompt supports **any type of repository**, including:

- **Services** — APIs, microservices, workers, event-driven services
- **Libraries** — shared packages published to NuGet, npm, PyPI, Maven, etc.
- **Infrastructure** — Terraform, Pulumi, CloudFormation, Bicep, CDK projects
- **Frontend apps** — Angular, React, Vue, Blazor, etc.
- **CLI tools** — command-line utilities and scripts
- **Any other type** — adapt the documentation to what the repo actually is

## Your Goal

Analyze the current repository — its code, structure, configuration, dependencies, and behavior — and generate a complete `docs` folder with all required files, populated with real content based on what you find.

## Step 0: Detect Repository Type

Before anything else, determine the repository type by scanning for indicators:

| Type | Indicators |
|---|---|
| **Service** | HTTP server, event handlers, message consumers, `Dockerfile`, API routes, gRPC definitions |
| **Library** | `.nuspec`, `.csproj` with `<PackAsTool>` or `<IsPackable>`, `package.json` with no server, `setup.py`/`pyproject.toml` with package config, `*.gemspec`, exports-only code |
| **Terraform / IaC** | `*.tf` files, `main.tf`, `variables.tf`, `outputs.tf`, `modules/` folder, `terragrunt.hcl`, `template.yaml` (SAM/CFN), `*.bicep` |
| **Frontend App** | `angular.json`, `next.config.*`, `vite.config.*`, `src/App.tsx`, `src/app/app.module.ts` |
| **CLI Tool** | Binary entry point, command definitions, `bin` field in package.json, `<OutputType>Exe</OutputType>` |

State the detected type at the top of `repo-overview.md`. If the repo is a hybrid (e.g., a service + Terraform), document both aspects.

## Important Rules

1. **Analyze before writing.** Read source code, configuration files, project files, entry points, and any existing documentation before generating anything.
2. **Write real content, not placeholders.** Every file must contain actual information derived from the repository. Do not use generic examples or lorem ipsum.
3. **If information is missing or unclear**, write what you can determine and mark uncertain sections with `<!-- TODO: verify -->`.
4. **Use English** for all documentation content. File names are in English.
5. **Do not delete or overwrite** any existing files outside the `docs` folder.
6. **If a `docs` folder already exists — STOP IMMEDIATELY.** Do not create, merge, update, or modify any files. Instead:
   - Inform the user: "A `docs` folder already exists in this repository."
   - Ask the user what they would like to do. Suggest these options:
     1. **Delete the existing `docs` folder** and generate a fresh one from scratch.
     2. **Use a different folder name** — ask the user to provide an alternative path (e.g. `docs-new/`, `docs-v2/`).
     3. **Abort** — do nothing and stop.
   - **Wait for the user's explicit choice before proceeding.** Do not assume, do not auto-merge, do not continue generating files.

---

## Folder Structure to Generate

```
docs/
├── context/
│   └── service-context.md      # AI entry point — navigation hub for AI tools
├── repo-overview.md            # Business-level overview of the repository
├── architecture.md             # Internal architecture and design decisions
├── code-map.md                 # Source code structure and key files
└── specs/
    ├── service-spec.md         # Main specification (adapt title to repo type)
    └── features/
        └── <feature-name>-spec.md   # One file per significant feature / module / resource group
```

---

## File Specifications

### 1. `docs/context/service-context.md` — AI Entry Point

This is the main navigation file for AI tools exploring this repository.

**Must include:**

- Repository name, type (Service / Library / Infrastructure / Frontend / CLI), and one-line description
- A "Service Documents" section with links to all other docs files (repo-overview, architecture, code-map)
- A "KIRO Steering Files" section — but **only if** `.kiro/steering/` actually exists in the repository and contains relevant files (e.g., steering files about project overview, architecture, conventions). Omit this section entirely if the folder doesn't exist or contains no relevant files.
- A "Specifications" section with links to spec files (main spec + each feature/module spec)
- A "Generated specs" section listing paths to `.kiro/specs/` and `_bmad-output/` — but **only if** either of these folders actually exists in the repository. Omit this section entirely if neither folder exists.
- A "System-Level Documents" section with links to system-level docs that live outside the repo. To find them:
  1. Identify the repo's root folder (the folder containing the repo's source code and `docs/`).
  2. Go up one level to the repo's parent folder, then search sibling folders (folders at the same level as the parent) for these files:
     - `system-overview.md` (typically under an `architecture/` folder)
     - `services-index.md` (typically under an `architecture/` folder)
     - `system-spec.md` (typically under a `specs/` folder)
  3. If not found at that level, continue searching one more level up and check sibling folders there.
  4. Use the correct relative paths from `docs/context/service-context.md` to the found files.
  5. If a file cannot be found, use a placeholder path and mark it with `<!-- TODO: adjust path -->`.
- A "Quick Context" section adapted to the repo type (see below)

**Quick Context — adapt by repo type:**

For **Services:**
- Responsibility, Events Produced, Events Consumed, APIs, Dependencies

For **Libraries:**
- Purpose, Public API surface (key exports), Package name & registry, Consumers (who uses this library), Dependencies

For **Terraform / IaC:**
- Purpose, Managed resources (high-level), Providers used, Input variables (key ones), Outputs, Remote state dependencies

For **Frontend Apps:**
- Purpose, Key routes/pages, Backend APIs consumed, State management approach, Dependencies

**Template:**

```markdown
# AI Entry — <repo-name>

> **Type:** <Service | Library | Infrastructure | Frontend App | CLI Tool>

This is the main navigation point for AI-assisted exploration of <repo-name>.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

<!-- Include this section ONLY if .kiro/steering/ exists in the repo AND contains relevant files. Omit entirely otherwise. -->
## KIRO Steering Files

- .kiro/steering/<relevant-file>.md — <brief description>
<!-- List only steering files relevant to understanding the repo. -->

## Specifications

- [Service Spec](../specs/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: <name>](../specs/features/<name>-spec.md)
<!-- Add a line for each feature / module / resource group -->

<!-- Include this section ONLY if .kiro/specs/ or _bmad-output/ exist in the repo. Omit entirely otherwise. -->
## Generated specs

- .kiro/specs/
- _bmad-output/
<!-- List only folders that actually exist. -->

## System-Level Documents

> These files are located outside this repository, in sibling folders relative to the repo's parent.
> The paths below were resolved by searching for these files upward from the repo root.
> If a path could not be resolved, it is marked with a TODO comment.

- [System Overview](<resolved-relative-path>/system-overview.md) <!-- TODO: adjust path if not found -->
- [Services Index](<resolved-relative-path>/services-index.md) <!-- TODO: adjust path if not found -->
- [System Spec](<resolved-relative-path>/system-spec.md) <!-- TODO: adjust path if not found -->

## Quick Context

<!-- Adapt the fields below to the repo type -->
- **Purpose:** <one sentence>
- **Type:** <Service | Library | Infrastructure | Frontend App | CLI Tool>
- ...
```

---

### 2. `docs/repo-overview.md` — Repository Overview

Business and architectural overview of the repository. Adapt content to the repo type.

**Must always include:**

- Repository type (Service / Library / Infrastructure / Frontend / CLI)
- Purpose: what it does, which domain it belongs to
- Responsibility boundaries: what it owns, what it does NOT own
- How it fits into the larger system
- Tech stack (language, framework, runtime, providers, etc.)
- If the repository contains relevant steering files (`.kiro/steering/`), include a "Related Steering Files" section with links to each relevant file. Only link steering files that relate to project overview, product overview, setup, onboarding, or general guidelines.

**Additional sections by repo type:**

For **Services:**
- How to run locally (from package.json / Makefile / Dockerfile / docker-compose)
- Environment variables required

For **Libraries:**
- Package name and registry (npm, NuGet, PyPI, etc.)
- How to install (`npm install ...`, `dotnet add package ...`, etc.)
- Versioning strategy (SemVer, CalVer, etc.)
- Who consumes this library (list known consumers if possible)
- How to build and publish

For **Terraform / IaC:**
- What infrastructure it manages (high-level)
- Providers and their versions
- Backend configuration (state storage)
- How to plan/apply (`terraform plan`, `terraform apply`, etc.)
- Environment/workspace strategy (dev/staging/prod)
- Required credentials and access

For **Frontend Apps:**
- How to run locally (`npm start`, `ng serve`, etc.)
- Build and deployment process
- Environment configuration

---

### 3. `docs/architecture.md` — Architecture

Internal architecture and design decisions. Adapt to repo type.

**Must always include:**

- Key design decisions and rationale
- High-level structure / component diagram (as text or mermaid)
- If the repository contains relevant steering files (`.kiro/steering/`), include a "Related Steering Files" section with links to each relevant file. Only link steering files that relate to architecture, design decisions, coding standards, or conventions.

**Additional sections by repo type:**

For **Services:**
- Interactions with other services (sync and async)
- Error handling strategy

For **Libraries:**
- Public API design philosophy
- Extension points / plugin architecture (if any)
- Key abstractions and patterns used
- Dependency injection / configuration approach
- Compatibility considerations (target frameworks, browser support, etc.)

For **Terraform / IaC:**
- Module structure and composition
- Resource dependency graph (high-level)
- State management strategy
- Environment separation approach (workspaces, folders, tfvars)
- Naming conventions for resources
- Tagging strategy

For **Frontend Apps:**
- Component architecture
- State management approach
- Routing structure
- API integration layer
- Build pipeline

---

### 4. `docs/code-map.md` — Code Map

Explains the source code structure so a developer (or AI) can navigate without reading everything.

This file must be **technology-agnostic**. Adapt the content to whatever you actually find in the repo.

**Must always include:**

- Tech stack summary (language, framework, build tool)
- A table mapping each significant file/folder to its purpose
- Entry point identification

**Additional guidance by repo type:**

For **Services:**
- Handlers/controllers, services/business logic, models/entities, event publishers/consumers, routes, clients, config files

For **Libraries:**
- Public API surface (exported types, functions, classes), internal implementation, tests, build/pack configuration (`.csproj`, `package.json`, `tsconfig.json`, etc.), examples/samples folder

For **Terraform / IaC:**
- Root module files (`main.tf`, `variables.tf`, `outputs.tf`, `providers.tf`, `backend.tf`), child modules under `modules/`, environment-specific tfvars, data sources, scripts/helpers

For **Frontend Apps:**
- App entry point, routing module, feature modules/components, services, state management, assets, styles, environment configs

**Format:**

```markdown
# Code Map — <repo-name>

## Tech Stack

- Language: <detected>
- Framework: <detected>
- Build tool: <detected>
- Package registry: <if library — npm / NuGet / PyPI / etc.>

## Source Structure

| Path | Description |
|---|---|
| `<file-or-folder>` | <description> |
| ... | ... |
```

> Adapt the table rows to match the actual project structure. Do not force a structure that doesn't exist in the repo.

---

### 5. `docs/specs/service-spec.md` — Main Specification

The main spec document for this repository. Despite the filename, this applies to any repo type.

**Must always include:**

- Responsibilities (bullet list)
- A "Features Specifications" section with links to feature/module specs under `features/`
- A "Generated specs" section listing paths to `.kiro/specs/` and `_bmad-output/` — but only if those folders actually exist in the repository. Omit this section entirely if neither folder exists.
- Dependencies: list of external services, packages, and infrastructure

**Additional sections by repo type:**

For **Services:**
- Events Produced: table with Event name, Schema (fields), Trigger
- Events Consumed: table with Event name, Source service, Handler
- APIs Provided: table with Method, Path, Description, Request/Response summary
  - The Method column must use colored badges with inline HTML `<span>` elements to visually distinguish HTTP methods, following the standard Swagger/OpenAPI color scheme:
    - **GET** — Blue: `<span style="background-color:#61affe;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">GET</span>`
    - **POST** — Green: `<span style="background-color:#49cc90;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">POST</span>`
    - **PUT** — Orange: `<span style="background-color:#fca130;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">PUT</span>`
    - **PATCH** — Orange: `<span style="background-color:#fca130;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">PATCH</span>`
    - **DELETE** — Red: `<span style="background-color:#f93e3e;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">DELETE</span>`

For **Libraries:**
- Public API: table with Export name, Type (class/function/interface/type), Description
- Configuration options: table with Option, Type, Default, Description
- Supported platforms / target frameworks

For **Terraform / IaC:**
- Managed Resources: table with Resource type, Logical name, Purpose
- Input Variables: table with Variable, Type, Default, Description, Required
- Outputs: table with Output, Description, Sensitive
- Providers: table with Provider, Version constraint, Purpose
- Module dependencies (if using child modules)

For **Frontend Apps:**
- Pages/Routes: table with Route, Component, Description
- Backend APIs consumed: table with Endpoint, Method, Purpose
- State stores / slices

---

### 6. `docs/specs/features/<feature-name>-spec.md` — Feature / Module Specs

One file per significant feature, module, or resource group.

**How to identify features — by repo type:**

- **Services:** Each event handler, API endpoint group, retry mechanism, integration with external system
- **Libraries:** Each major public API area, each plugin/extension point, each significant utility group
- **Terraform / IaC:** Each child module, each resource group (e.g. networking, compute, storage, IAM), each environment configuration
- **Frontend Apps:** Each feature module, each page/route group, each shared component library

**Must include:**

- A "Service Context" section at the top that states which service/repo this feature belongs to and links to the parent service spec using the `#[[file:]]` syntax
- Feature/module name and purpose
- Inputs and outputs (or variables and outputs for TF)
- Internal flow or structure (step by step)
- Interactions with other components / services / modules
- Error handling / edge cases / validation
- Related events, APIs, resources, or exports

**Template (for Services — adapt for other repo types):**

```markdown
# Feature Specification — <Feature Name>

## Service Context

This feature is part of <repo-name>.
For the full service specification, see:

#[[file:../service-spec.md]]

## Purpose

<what this feature does>

## Inputs

| Input | Source | Format |
|---|---|---|
| <input> | <source> | <format> |

## Outputs

| Output | Target | Format |
|---|---|---|
| <output> | <target> | <format> |

## Internal Flow

1. <step>
2. <step>
...

## Service Interactions

| Service | Direction | Method | Purpose |
|---|---|---|---|
| <service> | <Inbound/Outbound> | <Event/REST> | <purpose> |
```

---

## Execution Steps

1. **Check if `docs` folder exists.** If yes — STOP and ask the user (see Rule 6).
2. **Scan the repository:** Read project files, entry points, folder structure, source files, config files.
3. **Detect repository type** (Service / Library / Infrastructure / Frontend / CLI / Hybrid).
4. **Identify the repository name** from project files, folder name, or code.
5. **Map the architecture:** Identify the key components based on repo type.
6. **Identify features/modules:** Group functionality into distinct documentation units.
7. **Generate all files** listed above with real content, adapted to the detected repo type.
8. **Cross-reference:** Ensure all links between docs files are correct and consistent.
9. **Verify:** Make sure all interfaces, dependencies, and components mentioned in one file are consistent across all files.

---

## Notes

- Adjust file extensions in the code map to match the actual project (`.ts`, `.cs`, `.tf`, `.py`, `.java`, etc.).
- If the repo is a monorepo with multiple projects, generate docs for each project separately under its own path.
- The `System-Level Documents` links in `service-context.md` should be resolved by searching for the files (`system-overview.md`, `services-index.md`, `system-spec.md`) in sibling folders relative to the repo's parent directory. Use correct relative paths from `docs/context/` to the found files. If not found, use a placeholder and mark with `<!-- TODO: adjust path -->`.
- Feature/module spec files should use kebab-case naming: `email-delivery-spec.md`, `networking-module-spec.md`, `auth-middleware-spec.md`, etc.
- For Terraform repos, treat each child module and each major resource group as a "feature" for documentation purposes.
- For library repos, treat each major public API area as a "feature" for documentation purposes.

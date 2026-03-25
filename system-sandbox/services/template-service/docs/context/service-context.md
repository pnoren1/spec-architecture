# AI Entry — template-service

This is the main navigation point for AI-assisted exploration of template-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: Template Management](../spec/features/template-management.md)
- [Feature: Template Rendering](../spec/features/template-rendering.md)

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Stores and renders notification templates
- **Events Produced:** `template.resolved`
- **Events Consumed:** None
- **APIs:** `POST /templates/resolve`, `GET /templates/:id`, `POST /templates`
- **Dependencies:** PostgreSQL

# AI Entry — audit-service

This is the main navigation point for AI-assisted exploration of audit-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: Audit Event Storage](../spec/features/audit-event-storage.md)
- [Feature: Audit Query API](../spec/features/audit-query-api.md)

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Stores audit logs and system activity
- **Events Produced:** None
- **Events Consumed:** `user.created`, `notification.sent`, `email.delivered`, `email.failed`, `template.resolved`
- **APIs:** `GET /audit/events`, `GET /audit/events/:id`
- **Dependencies:** PostgreSQL, event bus

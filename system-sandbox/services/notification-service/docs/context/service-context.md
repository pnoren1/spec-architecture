# AI Entry — notification-service

This is the main navigation point for AI-assisted exploration of notification-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: Notification Routing](../spec/features/notification-routing.md)
- [Feature: Notification Preferences](../spec/features/notification-preferences.md)

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Coordinates notifications and routes messages
- **Events Produced:** `notification.sent`, `notification.failed`
- **Events Consumed:** `user.created`, `email.failed`
- **APIs:** `GET /notifications/:id`
- **Dependencies:** template-service (HTTP), user-service (HTTP), event bus

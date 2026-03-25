# AI Entry — user-service

This is the main navigation point for AI-assisted exploration of user-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: User Registration](../spec/features/user-registration.md)
- [Feature: User Profile Update](../spec/features/user-profile-update.md)

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Manages user profiles and lifecycle events
- **Events Produced:** `user.created`, `user.updated`, `user.deleted`
- **Events Consumed:** None
- **APIs:** `GET /users/:id`, `POST /users`, `PUT /users/:id`
- **Dependencies:** Event bus

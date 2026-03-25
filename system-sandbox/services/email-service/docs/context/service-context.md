# AI Entry — email-service

This is the main navigation point for AI-assisted exploration of email-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: Email Delivery](../spec/features/email-delivery.md)
- [Feature: Email Retry Mechanism](../spec/features/email-retry-mechanism.md)

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Handles email delivery via SMTP
- **Events Produced:** `email.delivered`, `email.failed`
- **Events Consumed:** `notification.sent`
- **APIs:** None (event-driven only)
- **Dependencies:** SMTP provider, event bus

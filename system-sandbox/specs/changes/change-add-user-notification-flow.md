# CHANGE-001: Add User Notification Flow

## Business Goal

When a new user registers, the system should automatically send a welcome email using a predefined template. This requires coordination across user-service, notification-service, template-service, email-service, and audit-service.

## Architecture Change

### New Event Flow

1. `user-service` publishes `user.created` event upon successful registration
2. `notification-service` subscribes to `user.created` and initiates the welcome notification
3. `notification-service` calls `template-service` to resolve the welcome email template
4. `notification-service` publishes `notification.sent` with the resolved content
5. `email-service` consumes `notification.sent` and delivers the email via SMTP
6. `audit-service` logs all events in the chain

### New Components

| Service | New Component | Description |
|---|---|---|
| user-service | EventPublisher | Publishes `user.created` to the event bus |
| notification-service | UserCreatedHandler | Consumes `user.created` and orchestrates notification |
| notification-service | TemplateClient | HTTP client for template-service |
| template-service | WelcomeTemplate | Default welcome email template |
| email-service | NotificationSentHandler | Consumes `notification.sent` and sends email |
| audit-service | EventLogger | Generic handler for all consumed events |

## Impacted Services

### user-service
- **Changes:** Add event publishing after user creation
- **New dependency:** Event bus client
- **Spec updates:** Update service-spec.md to document `user.created` event schema

### notification-service
- **Changes:** Add `user.created` consumer, template resolution logic, notification publishing
- **New dependencies:** template-service HTTP client, event bus client
- **Spec updates:** Update service-spec.md, add notification-routing feature spec

### template-service
- **Changes:** Add welcome email template, ensure `/templates/resolve` endpoint handles it
- **New dependency:** None
- **Spec updates:** Update service-spec.md, update template-management feature spec

### email-service
- **Changes:** Add `notification.sent` consumer, SMTP delivery logic
- **New dependency:** Event bus client, SMTP provider
- **Spec updates:** Update service-spec.md, add email-delivery feature spec

### audit-service
- **Changes:** Add consumers for `user.created`, `notification.sent`, `email.delivered`, `email.failed`
- **New dependency:** Event bus client
- **Spec updates:** Update service-spec.md, update audit-event-storage feature spec

## Required Service Spec Updates

1. `services/user-service/docs/spec/service-spec.md` — Add events produced section
2. `services/notification-service/docs/spec/service-spec.md` — Add events consumed, template-service dependency
3. `services/email-service/docs/spec/service-spec.md` — Add events consumed
4. `services/template-service/docs/spec/service-spec.md` — Add welcome template
5. `services/audit-service/docs/spec/service-spec.md` — Add all consumed events

## Rollout Plan

1. Deploy template-service with welcome template
2. Deploy notification-service with routing logic
3. Deploy email-service with delivery handler
4. Deploy audit-service with new event consumers
5. Deploy user-service with event publishing (activates the flow)

# System Overview — Notification Platform

## Business Domain

The Notification Platform is a distributed system responsible for managing user lifecycle events and delivering notifications across multiple channels. It coordinates user registration, notification routing, template resolution, email delivery, and audit logging.

## Services

| Service | Responsibility |
|---|---|
| user-service | Manages user profiles and lifecycle events |
| notification-service | Coordinates notifications and routes messages |
| email-service | Handles email delivery |
| template-service | Stores and renders notification templates |
| audit-service | Stores audit logs and system activity |

## Main Flows

### User Registration Notification Flow

1. `user-service` creates a new user and publishes `user.created`
2. `notification-service` consumes `user.created`, determines which notification to send
3. `notification-service` requests template resolution from `template-service`
4. `notification-service` publishes `notification.sent`
5. `email-service` consumes `notification.sent` and delivers the email
6. `audit-service` consumes major events from all services and stores logs

## Event Bus

All inter-service communication happens via an asynchronous event bus.

| Event | Producer | Consumers |
|---|---|---|
| `user.created` | user-service | notification-service, audit-service |
| `notification.sent` | notification-service | email-service, audit-service |
| `email.delivered` | email-service | audit-service |
| `email.failed` | email-service | notification-service, audit-service |
| `template.resolved` | template-service | audit-service |

## APIs (Synchronous)

| Endpoint | Service | Consumers |
|---|---|---|
| `GET /users/:id` | user-service | notification-service |
| `POST /templates/resolve` | template-service | notification-service |
| `GET /audit/events` | audit-service | (external / admin) |

## Architecture Diagram (Conceptual)

```
[user-service] --user.created--> [notification-service] --notification.sent--> [email-service]
                                        |                                           |
                                        |--POST /templates/resolve--> [template-service]
                                        |
[audit-service] <-- consumes events from all services
```

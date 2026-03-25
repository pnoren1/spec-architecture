# System Specification — Notification Platform

## 1. Business Domain

The Notification Platform enables automated, event-driven communication with users. When lifecycle events occur (user registration, profile updates, etc.), the platform determines the appropriate notification, resolves a template, delivers the message via email, and logs all activity for auditing.

## 2. Service Boundaries

| Service | Boundary |
|---|---|
| user-service | Owns user data. Source of truth for user profiles. |
| notification-service | Owns notification logic. Decides what to send and when. |
| email-service | Owns email delivery. Manages SMTP connections and retries. |
| template-service | Owns templates. Resolves templates with dynamic data. |
| audit-service | Owns audit trail. Immutable log of all system events. |

## 3. Main Flows

### 3.1 User Registration Notification

```
user-service           -> publishes user.created
notification-service   -> consumes user.created
                       -> calls template-service POST /templates/resolve
                       -> publishes notification.sent
email-service          -> consumes notification.sent
                       -> delivers email
                       -> publishes email.delivered | email.failed
audit-service          -> consumes user.created, notification.sent, email.delivered/failed
```

### 3.2 Email Retry Flow

```
email-service          -> publishes email.failed
notification-service   -> consumes email.failed
                       -> evaluates retry policy
                       -> re-publishes notification.sent (if retryable)
```

## 4. Major Events

| Event | Schema | Producer | Description |
|---|---|---|---|
| `user.created` | `{ userId, email, name, createdAt }` | user-service | New user registered |
| `user.updated` | `{ userId, changes, updatedAt }` | user-service | User profile changed |
| `notification.sent` | `{ notificationId, userId, channel, templateId, payload }` | notification-service | Notification dispatched |
| `notification.failed` | `{ notificationId, reason }` | notification-service | Notification could not be created |
| `email.delivered` | `{ emailId, notificationId, deliveredAt }` | email-service | Email successfully sent |
| `email.failed` | `{ emailId, notificationId, reason, retryable }` | email-service | Email delivery failed |
| `template.resolved` | `{ templateId, resolvedAt }` | template-service | Template rendered |

## 5. APIs Between Services

### user-service
- `GET /users/:id` — Returns user profile (consumed by notification-service)
- `POST /users` — Creates a new user
- `PUT /users/:id` — Updates user profile

### template-service
- `POST /templates/resolve` — Resolves a template with provided data (consumed by notification-service)
- `GET /templates/:id` — Returns template metadata
- `POST /templates` — Creates a new template

### audit-service
- `GET /audit/events` — Query audit events with filters
- `GET /audit/events/:id` — Get specific audit event

## 6. Non-Functional Requirements

- Event delivery: at-least-once semantics
- Email retry: exponential backoff, max 3 attempts
- Audit logs: immutable, append-only
- Template resolution: < 200ms p99 latency
- All services must emit structured logs

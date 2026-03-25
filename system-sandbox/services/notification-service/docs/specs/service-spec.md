# Service Specification — notification-service

## Responsibilities

- Consume lifecycle events and determine which notifications to send
- Resolve notification templates via template-service
- Publish notification events for delivery services
- Handle retry logic for failed deliveries

## Dependencies

| Dependency | Type | Description |
|---|---|---|
| PostgreSQL | Database | Stores notification records and preferences |
| RabbitMQ | Event Bus | Consumes and publishes events |
| template-service | HTTP | Resolves notification templates |
| user-service | HTTP | Fetches user data for template context |

## Events Produced

| Event | Schema | Trigger |
|---|---|---|
| `notification.sent` | `{ notificationId, userId, channel, templateId, payload }` | Notification dispatched to delivery |
| `notification.failed` | `{ notificationId, reason }` | Notification could not be created |

## Events Consumed

| Event | Source | Handler |
|---|---|---|
| `user.created` | user-service | `UserCreatedHandler` — triggers welcome notification |
| `email.failed` | email-service | `EmailFailedHandler` — evaluates retry policy |

## APIs Exposed

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notifications/:id` | Retrieve notification status by ID |

## Internal Components

| Component | Location | Description |
|---|---|---|
| NotificationRouter | `src/routes/notifications.js` | HTTP route handlers |
| NotificationService | `src/services/notificationService.js` | Orchestration logic |
| UserCreatedHandler | `src/handlers/userCreatedHandler.js` | Event consumer |
| EmailFailedHandler | `src/handlers/emailFailedHandler.js` | Retry logic |
| TemplateClient | `src/clients/templateClient.js` | HTTP client |
| UserClient | `src/clients/userClient.js` | HTTP client |
| EventPublisher | `src/events/publisher.js` | Event bus integration |

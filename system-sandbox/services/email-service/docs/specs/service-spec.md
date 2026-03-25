# Service Specification — email-service

## Responsibilities

- Consume notification events and deliver emails via SMTP
- Manage email delivery retries with exponential backoff
- Publish delivery status events

## Dependencies

| Dependency | Type | Description |
|---|---|---|
| RabbitMQ | Event Bus | Consumes `notification.sent`, publishes delivery status |
| SMTP Provider | External | Email delivery (e.g., SES, SendGrid, Mailgun) |

## Events Produced

| Event | Schema | Trigger |
|---|---|---|
| `email.delivered` | `{ emailId, notificationId, deliveredAt }` | Email successfully sent |
| `email.failed` | `{ emailId, notificationId, reason, retryable }` | Email delivery failed |

## Events Consumed

| Event | Source | Handler |
|---|---|---|
| `notification.sent` | notification-service | `NotificationSentHandler` — sends email |

## APIs Exposed

None. email-service is fully event-driven.

## Internal Components

| Component | Location | Description |
|---|---|---|
| NotificationSentHandler | `src/handlers/notificationSentHandler.js` | Event consumer |
| EmailSender | `src/services/emailSender.js` | SMTP delivery logic |
| EventPublisher | `src/events/publisher.js` | Event bus integration |

# Feature Spec: Notification Routing

## Feature Goal

Determine which notification to send based on incoming events, resolve the appropriate template, and dispatch the notification to the correct delivery channel.

## Inputs

| Source | Data | Description |
|---|---|---|
| Event: `user.created` | `{ userId, email, name }` | Triggers welcome notification |
| Event: `email.failed` | `{ notificationId, reason, retryable }` | Triggers retry evaluation |

## Outputs

- `notification.sent` event with resolved template content and delivery channel
- `notification.failed` event if routing or template resolution fails

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| template-service | HTTP: `POST /templates/resolve` | Resolve template with user data |
| user-service | HTTP: `GET /users/:id` | Fetch full user profile for template context |
| email-service | Event: `notification.sent` | Delivers the notification |
| audit-service | Event: `notification.sent` | Logs the notification |

## Internal Flow

1. Event consumer receives lifecycle event
2. Routing logic determines notification type (welcome, update, etc.)
3. User data is fetched from user-service
4. Template is resolved from template-service
5. `notification.sent` event is published with full payload
6. Notification record is persisted in database

## Error Cases

- Template resolution fails → publish `notification.failed`, log error
- User not found → publish `notification.failed`
- Event bus unavailable → retry with backoff

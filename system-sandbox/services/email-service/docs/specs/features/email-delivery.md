# Feature Spec: Email Delivery

## Feature Goal

Consume `notification.sent` events, format the email, deliver it via SMTP, and publish the delivery result.

## Inputs

| Source | Data | Description |
|---|---|---|
| Event: `notification.sent` | `{ notificationId, userId, channel, templateId, payload }` | Notification to deliver |

## Outputs

- `email.delivered` event on success
- `email.failed` event on failure

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | Event: `notification.sent` | Source of delivery requests |
| audit-service | Event: `email.delivered` / `email.failed` | Logs delivery status |

## Internal Flow

1. Consume `notification.sent` event
2. Extract recipient email, subject, and body from payload
3. Send email via SMTP provider
4. On success: publish `email.delivered`
5. On failure: publish `email.failed` with `retryable` flag

## Error Cases

- SMTP connection timeout → `email.failed` with `retryable: true`
- Invalid recipient → `email.failed` with `retryable: false`
- Rate limited → `email.failed` with `retryable: true`

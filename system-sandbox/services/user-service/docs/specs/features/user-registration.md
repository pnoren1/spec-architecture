# Feature Spec: User Registration

## Feature Goal

Allow new users to register in the system, persist their profile, and notify downstream services via the `user.created` event.

## Inputs

| Field | Type | Required | Description |
|---|---|---|---|
| email | string | Yes | User email address (must be unique) |
| name | string | Yes | User display name |

## Outputs

- HTTP 201 with created user object `{ id, email, name, createdAt }`
- `user.created` event published to event bus

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | Event: `user.created` | Triggers welcome notification flow |
| audit-service | Event: `user.created` | Logs the registration event |

## Internal Flow

1. Validate input (email format, uniqueness, name length)
2. Create user record in PostgreSQL
3. Publish `user.created` event to RabbitMQ
4. Return created user in HTTP response

## Error Cases

- Duplicate email → HTTP 409 Conflict
- Invalid input → HTTP 400 Bad Request
- Database failure → HTTP 500, event not published

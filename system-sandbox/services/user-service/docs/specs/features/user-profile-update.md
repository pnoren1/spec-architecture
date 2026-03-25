# Feature Spec: User Profile Update

## Feature Goal

Allow existing users to update their profile information and notify downstream services via the `user.updated` event.

## Inputs

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | No | Updated display name |
| email | string | No | Updated email address |

## Outputs

- HTTP 200 with updated user object `{ id, email, name, updatedAt }`
- `user.updated` event published to event bus

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | Event: `user.updated` | May trigger profile-change notification |
| audit-service | Event: `user.updated` | Logs the update event |

## Internal Flow

1. Validate user exists by ID
2. Validate input fields (email uniqueness if changed, name length)
3. Update user record in PostgreSQL
4. Publish `user.updated` event with changed fields
5. Return updated user in HTTP response

## Error Cases

- User not found → HTTP 404
- Duplicate email → HTTP 409 Conflict
- Invalid input → HTTP 400 Bad Request
- No fields provided → HTTP 400 Bad Request

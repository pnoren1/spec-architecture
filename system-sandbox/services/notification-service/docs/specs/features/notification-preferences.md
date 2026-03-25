# Feature Spec: Notification Preferences

## Feature Goal

Allow users to configure their notification preferences (channels, frequency, opt-out) and respect those preferences during notification routing.

## Inputs

| Field | Type | Required | Description |
|---|---|---|---|
| userId | UUID | Yes | The user whose preferences to manage |
| channel | string | No | Preferred channel: email, sms, push |
| enabled | boolean | No | Global notification opt-in/opt-out |
| frequency | string | No | Delivery frequency: immediate, daily-digest |

## Outputs

- Stored preference record
- Routing decisions respect stored preferences

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| user-service | HTTP: `GET /users/:id` | Validate user exists |

## Internal Flow

1. User submits preference update via API (future endpoint)
2. Preferences are validated and stored in database
3. During notification routing, preferences are loaded
4. If user has opted out or channel is disabled, notification is skipped
5. Frequency setting determines immediate vs. batched delivery

## Error Cases

- User not found → HTTP 404
- Invalid channel → HTTP 400
- Preferences not found → use system defaults

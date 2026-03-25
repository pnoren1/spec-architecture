# Feature Spec: Audit Event Storage

## Feature Goal

Consume events from all services and store them as immutable audit records in an append-only database.

## Inputs

| Source | Data | Description |
|---|---|---|
| Event: any | `{ type, source, payload, correlationId, timestamp }` | Any system event |

## Outputs

- Persisted audit record in PostgreSQL
- No events published (terminal consumer)

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| user-service | Event consumer | `user.created`, `user.updated` |
| notification-service | Event consumer | `notification.sent`, `notification.failed` |
| email-service | Event consumer | `email.delivered`, `email.failed` |
| template-service | Event consumer | `template.resolved` |

## Internal Flow

1. Event arrives on event bus
2. EventLogger extracts: event type, source service, payload, correlation ID, timestamp
3. Audit record is created with extracted metadata
4. Record is inserted into PostgreSQL (append-only, no updates)
5. Event is acknowledged

## Error Cases

- Database write failure → retry with backoff, do not acknowledge event
- Malformed event → log warning, acknowledge to prevent redelivery
- Duplicate event (same correlation ID + type) → store anyway (idempotency at query level)

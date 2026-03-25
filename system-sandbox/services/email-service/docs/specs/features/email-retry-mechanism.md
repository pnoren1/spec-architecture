# Feature Spec: Email Retry Mechanism

## Feature Goal

Automatically retry failed email deliveries using exponential backoff, up to a configurable maximum number of attempts.

## Inputs

| Source | Data | Description |
|---|---|---|
| Internal | Failed delivery record | Email that failed with `retryable: true` |

## Outputs

- Retried email delivery attempt
- Final `email.failed` event if max retries exceeded

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | Event: `email.failed` | notification-service may also implement retry at orchestration level |
| audit-service | Event: `email.failed` | Logs final failure |

## Internal Flow

1. Email delivery fails with `retryable: true`
2. Retry counter is incremented
3. If retries < max (default: 3), schedule retry with exponential backoff
   - Attempt 1: 1s delay
   - Attempt 2: 4s delay
   - Attempt 3: 16s delay
4. Re-attempt SMTP delivery
5. If successful: publish `email.delivered`
6. If max retries exceeded: publish `email.failed` with `retryable: false`

## Error Cases

- All retries exhausted → final `email.failed` event
- Service restart during retry → pending retries are lost (acceptable for v1)

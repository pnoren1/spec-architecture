# Steering: email-service Development Guidelines

## Code Standards
- SMTP provider must be abstracted behind an interface
- All delivery attempts must be logged with correlation ID
- Never store email content after successful delivery

## Retry Rules
- Only retry when `retryable: true`
- Exponential backoff: base 1s, factor 4x
- Max 3 attempts before final failure

## Event Handling
- Acknowledge events only after delivery attempt completes
- Include original notificationId in all published events
- Failed events must include human-readable reason

## Testing
- Use mock SMTP server for all tests
- Test retry logic with simulated failures
- Verify event publishing for both success and failure paths

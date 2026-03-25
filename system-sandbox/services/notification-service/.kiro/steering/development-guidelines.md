# Steering: notification-service Development Guidelines

## Code Standards
- All event handlers must be idempotent
- HTTP clients must have timeout and retry configuration
- Use correlation IDs from incoming events in all outgoing events

## Event Handling Rules
- Never block event processing on synchronous HTTP calls for more than 5s
- Failed template resolution must not crash the handler
- All consumed events must be acknowledged after processing

## Routing Rules
- Notification type is determined by event type + business rules
- User preferences override default routing
- Unknown event types are logged and skipped (no error)

## Testing
- Event handlers tested with mock event payloads
- HTTP clients tested with nock or similar
- Integration tests cover full routing flow with mocked dependencies

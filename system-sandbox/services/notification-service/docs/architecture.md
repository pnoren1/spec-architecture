# Architecture — notification-service

## Internal Components

```
src/
├── routes/        # Express route handlers
├── services/      # Business logic
├── handlers/      # Event consumers
├── clients/       # HTTP clients for other services
├── events/        # Event publishing
└── index.js       # Application entry point
```

## Design Decisions

- **Event-driven orchestration:** Reacts to events rather than being called directly
- **Template delegation:** Never renders templates locally; always calls template-service
- **Retry awareness:** Listens for `email.failed` to implement retry logic

## Notification Flow

1. Event arrives (e.g., `user.created`)
2. Handler determines notification type and channel
3. Template is resolved via template-service
4. `notification.sent` event is published for delivery services

## Dependencies

- `template-service` — Synchronous HTTP calls for template resolution
- `user-service` — Synchronous HTTP calls for user data enrichment
- `event bus` — Asynchronous event consumption and publishing

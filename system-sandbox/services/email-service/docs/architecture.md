# Architecture — email-service

## Internal Components

```
src/
├── handlers/      # Event consumers
├── services/      # Email sending logic
├── events/        # Event publishing
└── index.js       # Application entry point
```

## Design Decisions

- **Event-driven only:** No REST API; all work is triggered by events
- **Retry with backoff:** Failed deliveries are retried with exponential backoff
- **Provider abstraction:** SMTP provider is abstracted for easy swapping

## Email Delivery Flow

1. Consume `notification.sent` event
2. Format email (to, subject, body from event payload)
3. Send via SMTP provider
4. Publish `email.delivered` or `email.failed`

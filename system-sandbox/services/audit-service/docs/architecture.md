# Architecture — audit-service

## Internal Components

```
src/
├── routes/        # Express route handlers
├── services/      # Audit logic
├── handlers/      # Event consumers
├── models/        # Database models
└── index.js       # Application entry point
```

## Design Decisions

- **Append-only storage:** Audit records are never updated or deleted
- **Generic event handler:** Single handler processes all event types
- **Indexed queries:** Events are indexed by type, source, timestamp, and correlation ID

## Audit Storage Flow

1. Event arrives from any service
2. Generic handler extracts metadata (type, source, timestamp, correlation ID)
3. Event is stored as an immutable audit record
4. No events are published (audit-service is a terminal consumer)

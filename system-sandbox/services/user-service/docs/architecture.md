# Architecture — user-service

## Internal Components

```
src/
├── routes/        # Express route handlers
├── services/      # Business logic
├── models/        # Database models
├── events/        # Event publishing
└── index.js       # Application entry point
```

## Design Decisions

- **Event-first:** All state changes publish events before returning responses
- **Repository pattern:** Database access is abstracted behind repository interfaces
- **Stateless:** No in-memory state; all data lives in PostgreSQL

## Data Model

### User
| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| email | string | User email (unique) |
| name | string | Display name |
| createdAt | timestamp | Registration time |
| updatedAt | timestamp | Last update time |

## Event Publishing

After each write operation, the service publishes an event to the event bus:
- `POST /users` → `user.created`
- `PUT /users/:id` → `user.updated`
- `DELETE /users/:id` → `user.deleted`

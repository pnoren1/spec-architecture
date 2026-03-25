# Service Specification — user-service

## Responsibilities

- Create, read, update, and delete user profiles
- Publish lifecycle events when user data changes
- Serve as the source of truth for user identity

## Dependencies

| Dependency | Type | Description |
|---|---|---|
| PostgreSQL | Database | Persistent storage for user data |
| RabbitMQ | Event Bus | Publishes user lifecycle events |

## Events Produced

| Event | Schema | Trigger |
|---|---|---|
| `user.created` | `{ userId, email, name, createdAt }` | New user registered |
| `user.updated` | `{ userId, changes, updatedAt }` | User profile modified |
| `user.deleted` | `{ userId, deletedAt }` | User account removed |

## Events Consumed

None. user-service is an event producer only.

## APIs Exposed

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/:id` | Retrieve user profile by ID |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update an existing user profile |
| DELETE | `/users/:id` | Delete a user account |

## Internal Components

| Component | Location | Description |
|---|---|---|
| UserRouter | `src/routes/users.js` | HTTP route handlers |
| UserService | `src/services/userService.js` | Business logic layer |
| UserModel | `src/models/user.js` | Database model |
| EventPublisher | `src/events/publisher.js` | Event bus integration |

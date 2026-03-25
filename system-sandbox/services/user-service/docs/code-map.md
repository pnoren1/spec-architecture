# Code Map — user-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts Express server |
| `src/routes/users.js` | REST API route handlers for /users |
| `src/services/userService.js` | Business logic for user operations |
| `src/models/user.js` | User database model |
| `src/events/publisher.js` | Event bus publisher for user lifecycle events |

## Key Entry Points

- **HTTP:** `src/index.js` → `src/routes/users.js`
- **Events:** `src/services/userService.js` → `src/events/publisher.js`

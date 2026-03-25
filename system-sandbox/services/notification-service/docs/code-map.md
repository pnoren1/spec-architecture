# Code Map — notification-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts Express server and event consumers |
| `src/routes/notifications.js` | REST API route handlers for /notifications |
| `src/services/notificationService.js` | Core notification orchestration logic |
| `src/handlers/userCreatedHandler.js` | Handles `user.created` events |
| `src/handlers/emailFailedHandler.js` | Handles `email.failed` events for retry |
| `src/clients/templateClient.js` | HTTP client for template-service |
| `src/clients/userClient.js` | HTTP client for user-service |
| `src/events/publisher.js` | Event bus publisher |

## Key Entry Points

- **HTTP:** `src/index.js` → `src/routes/notifications.js`
- **Events:** `src/handlers/userCreatedHandler.js`, `src/handlers/emailFailedHandler.js`

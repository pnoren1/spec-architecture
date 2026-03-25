# Code Map — email-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts event consumers |
| `src/handlers/notificationSentHandler.js` | Handles `notification.sent` events |
| `src/services/emailSender.js` | SMTP email sending logic |
| `src/events/publisher.js` | Event bus publisher for delivery status |

## Key Entry Points

- **Events:** `src/handlers/notificationSentHandler.js`
- **SMTP:** `src/services/emailSender.js`

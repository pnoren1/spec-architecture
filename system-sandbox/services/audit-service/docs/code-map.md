# Code Map — audit-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts Express server and event consumers |
| `src/routes/audit.js` | REST API route handlers for /audit |
| `src/services/auditService.js` | Audit storage and query logic |
| `src/handlers/eventLogger.js` | Generic event consumer for all event types |
| `src/models/auditEvent.js` | Audit event database model |

## Key Entry Points

- **HTTP:** `src/index.js` → `src/routes/audit.js`
- **Events:** `src/handlers/eventLogger.js`

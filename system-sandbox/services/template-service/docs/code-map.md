# Code Map — template-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts Express server |
| `src/routes/templates.js` | REST API route handlers for /templates |
| `src/services/templateService.js` | Template CRUD and rendering logic |
| `src/models/template.js` | Template database model |
| `src/events/publisher.js` | Event bus publisher for audit events |

## Key Entry Points

- **HTTP:** `src/index.js` → `src/routes/templates.js`
- **Rendering:** `src/services/templateService.js`

# Service Specification — template-service

## Responsibilities

- Store and manage notification templates
- Render templates with dynamic data using Handlebars
- Provide synchronous template resolution API

## Dependencies

| Dependency | Type | Description |
|---|---|---|
| PostgreSQL | Database | Persistent storage for templates |
| RabbitMQ | Event Bus | Publishes `template.resolved` for audit |

## Events Produced

| Event | Schema | Trigger |
|---|---|---|
| `template.resolved` | `{ templateId, resolvedAt }` | Template successfully rendered |

## Events Consumed

None. template-service is API-driven.

## APIs Exposed

| Method | Endpoint | Description |
|---|---|---|
| POST | `/templates/resolve` | Resolve a template with provided data |
| GET | `/templates/:id` | Retrieve template metadata |
| POST | `/templates` | Create a new template |

## Internal Components

| Component | Location | Description |
|---|---|---|
| TemplateRouter | `src/routes/templates.js` | HTTP route handlers |
| TemplateService | `src/services/templateService.js` | CRUD and rendering logic |
| TemplateModel | `src/models/template.js` | Database model |
| EventPublisher | `src/events/publisher.js` | Event bus integration |

# Architecture — template-service

## Internal Components

```
src/
├── routes/        # Express route handlers
├── services/      # Template logic
├── models/        # Database models
├── events/        # Event publishing
└── index.js       # Application entry point
```

## Design Decisions

- **Synchronous API:** Templates are resolved via HTTP, not events, for low-latency responses
- **Handlebars templating:** Templates use Handlebars syntax for variable interpolation
- **Versioned templates:** Templates support versioning for safe updates

## Template Resolution Flow

1. Receive `POST /templates/resolve` with templateId and data
2. Load template from database
3. Render template with Handlebars using provided data
4. Return rendered content (subject + body)
5. Publish `template.resolved` event for audit

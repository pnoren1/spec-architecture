# Feature Spec: Template Rendering

## Feature Goal

Resolve a template by ID with provided dynamic data, returning the rendered subject and body.

## Inputs

| Field | Type | Required | Description |
|---|---|---|---|
| templateId | UUID | Yes | Template to resolve |
| data | object | Yes | Key-value pairs for Handlebars interpolation |

## Outputs

- Rendered template: `{ subject: string, body: string }`
- `template.resolved` event published for audit

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | API caller | Requests template resolution during notification flow |
| audit-service | Event: `template.resolved` | Logs template resolution |

## Internal Flow

1. Receive `POST /templates/resolve` with templateId and data
2. Load template from database by ID (latest version)
3. Compile Handlebars template for subject and body
4. Render with provided data
5. Publish `template.resolved` event
6. Return rendered content

## Error Cases

- Template not found → HTTP 404
- Missing required template variables → HTTP 400 with list of missing vars
- Handlebars rendering error → HTTP 500

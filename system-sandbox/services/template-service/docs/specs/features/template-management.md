# Feature Spec: Template Management

## Feature Goal

Allow creation, retrieval, and versioning of notification templates.

## Inputs

### Create Template
| Field | Type | Required | Description |
|---|---|---|---|
| name | string | Yes | Template identifier (e.g., "welcome-email") |
| subject | string | Yes | Email subject template (Handlebars) |
| body | string | Yes | Email body template (Handlebars) |
| version | number | No | Template version (auto-incremented) |

## Outputs

- Created template object with ID and version
- Template metadata on retrieval

## Interactions with Other Services

| Service | Interaction | Description |
|---|---|---|
| notification-service | API consumer | Creates and retrieves templates |

## Internal Flow

1. Validate template input (name uniqueness per version, valid Handlebars syntax)
2. Store template in PostgreSQL
3. Return created template with generated ID and version

## Error Cases

- Duplicate name+version → HTTP 409 Conflict
- Invalid Handlebars syntax → HTTP 400 Bad Request
- Template not found → HTTP 404

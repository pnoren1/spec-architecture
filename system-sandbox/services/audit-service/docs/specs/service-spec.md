# Service Specification — audit-service

## Responsibilities

- Consume events from all services and store them as immutable audit records
- Provide a query API for retrieving audit history
- Support filtering by event type, source service, time range, and correlation ID

## Dependencies

| Dependency | Type | Description |
|---|---|---|
| PostgreSQL | Database | Append-only storage for audit records |
| RabbitMQ | Event Bus | Consumes events from all services |

## Events Produced

None. audit-service is a terminal consumer.

## Events Consumed

| Event | Source | Handler |
|---|---|---|
| `user.created` | user-service | `EventLogger` |
| `user.updated` | user-service | `EventLogger` |
| `notification.sent` | notification-service | `EventLogger` |
| `notification.failed` | notification-service | `EventLogger` |
| `email.delivered` | email-service | `EventLogger` |
| `email.failed` | email-service | `EventLogger` |
| `template.resolved` | template-service | `EventLogger` |

## APIs Exposed

| Method | Endpoint | Description |
|---|---|---|
| GET | `/audit/events` | Query audit events with filters |
| GET | `/audit/events/:id` | Retrieve specific audit event by ID |

### Query Parameters for GET /audit/events

| Param | Type | Description |
|---|---|---|
| type | string | Filter by event type |
| source | string | Filter by source service |
| from | ISO date | Start of time range |
| to | ISO date | End of time range |
| correlationId | UUID | Filter by correlation ID |
| limit | number | Max results (default: 50) |
| offset | number | Pagination offset |

## Internal Components

| Component | Location | Description |
|---|---|---|
| AuditRouter | `src/routes/audit.js` | HTTP route handlers |
| AuditService | `src/services/auditService.js` | Storage and query logic |
| EventLogger | `src/handlers/eventLogger.js` | Generic event consumer |
| AuditEventModel | `src/models/auditEvent.js` | Database model |

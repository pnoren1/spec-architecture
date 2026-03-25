# Feature Spec: Audit Query API

## Feature Goal

Provide a REST API for querying audit events with filtering, pagination, and time-range support.

## Inputs

### GET /audit/events
| Param | Type | Required | Description |
|---|---|---|---|
| type | string | No | Filter by event type |
| source | string | No | Filter by source service |
| from | ISO date | No | Start of time range |
| to | ISO date | No | End of time range |
| correlationId | UUID | No | Filter by correlation ID |
| limit | number | No | Max results (default: 50, max: 200) |
| offset | number | No | Pagination offset |

### GET /audit/events/:id
| Param | Type | Required | Description |
|---|---|---|---|
| id | UUID | Yes | Audit event ID |

## Outputs

- List of audit events matching filters (paginated)
- Single audit event by ID

## Interactions with Other Services

None. The query API is consumed by external clients and admin tools.

## Internal Flow

1. Parse and validate query parameters
2. Build database query with filters
3. Execute query with pagination
4. Return results with total count for pagination metadata

## Error Cases

- Invalid date format → HTTP 400
- Limit exceeds maximum → clamp to 200
- Event not found by ID → HTTP 404

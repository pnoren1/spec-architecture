# Steering: audit-service Development Guidelines

## Code Standards
- Audit records are NEVER updated or deleted
- All database operations are INSERT only
- Event handler must be generic (single handler for all event types)

## Storage Rules
- Every audit record must include: type, source, payload, correlationId, timestamp
- Payload is stored as JSONB for flexible querying
- Indexes on: type, source, timestamp, correlationId

## Query API Rules
- Default limit is 50, maximum is 200
- Results ordered by timestamp descending
- Total count included in response for pagination

## Testing
- Test event handler with various event shapes
- Test query API with filter combinations
- Verify append-only behavior (no UPDATE/DELETE queries)

# Steering: template-service Development Guidelines

## Code Standards
- All templates must be validated before storage
- Handlebars compilation errors must return descriptive messages
- Template rendering must be stateless (no side effects)

## API Performance
- Template resolution must complete in < 200ms p99
- Cache compiled templates in memory (invalidate on update)
- Database queries must use indexed lookups

## Versioning Rules
- Templates are immutable once created
- New versions are created instead of updates
- Latest version is used by default unless specified

## Testing
- Unit tests for Handlebars rendering with various data shapes
- Integration tests for API endpoints
- Performance tests for resolution latency

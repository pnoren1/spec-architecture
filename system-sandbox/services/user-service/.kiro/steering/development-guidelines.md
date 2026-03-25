# Steering: user-service Development Guidelines

## Code Standards
- Use async/await for all asynchronous operations
- All route handlers must have try/catch with proper error responses
- Database queries go through the repository layer, never in route handlers

## Event Publishing Rules
- Events must be published AFTER successful database writes
- Event payloads must include a correlation ID for tracing
- Never publish events inside database transactions

## Testing
- Unit tests for service layer logic
- Integration tests for API endpoints
- Event publishing must be tested with mock event bus

## API Conventions
- All responses use JSON
- Error responses follow format: `{ error: string, code: string }`
- Successful creates return 201, updates return 200, deletes return 204

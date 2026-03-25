# Repository Overview — audit-service

## Purpose

The audit-service is the system's immutable log. It consumes events from all other services and stores them as audit records. It also provides a query API for retrieving audit history.

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL (append-only)
- Event Bus: RabbitMQ

## Getting Started

```bash
npm install
npm run dev
```

## Key Directories

- `src/` — Application source code
- `docs/` — Documentation and specifications
- `.kiro/` — Kiro specs and steering files

# Repository Overview — notification-service

## Purpose

The notification-service is the orchestration layer of the Notification Platform. It consumes lifecycle events, determines which notifications to send, resolves templates, and dispatches notifications to delivery services.

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL
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

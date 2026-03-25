# Repository Overview — email-service

## Purpose

The email-service is responsible for delivering emails. It consumes `notification.sent` events, formats the email, sends it via SMTP, and publishes delivery status events.

## Tech Stack

- Runtime: Node.js
- SMTP: Nodemailer
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

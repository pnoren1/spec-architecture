# KIRO Spec: Email Delivery

## Status: In Progress

## Requirements
- Consume `notification.sent` events
- Send emails via SMTP
- Publish delivery status events

## Tasks
- [x] Define event consumer for `notification.sent`
- [x] Implement SMTP sender abstraction
- [ ] Add email formatting from event payload
- [ ] Integrate delivery status event publishing
- [ ] Add connection pooling for SMTP

# KIRO Spec: Audit Event Storage

## Status: In Progress

## Requirements
- Consume events from all services
- Store as immutable audit records
- Support all event types in the system

## Tasks
- [x] Define audit event data model
- [x] Implement generic event consumer
- [ ] Add event metadata extraction
- [ ] Implement append-only database writes
- [ ] Add retry logic for failed writes

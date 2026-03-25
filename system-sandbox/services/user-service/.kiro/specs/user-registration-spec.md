# KIRO Spec: User Registration

## Status: In Progress

## Requirements
- Users can register with email and name
- Email must be unique across the system
- Registration publishes `user.created` event

## Tasks
- [x] Define user data model
- [x] Implement POST /users endpoint
- [ ] Add email uniqueness validation
- [ ] Integrate event bus publisher
- [ ] Add input validation middleware

# KIRO Spec: Notification Routing

## Status: In Progress

## Requirements
- Consume `user.created` events and trigger welcome notification
- Resolve templates via template-service
- Publish `notification.sent` for delivery

## Tasks
- [x] Define event consumer for `user.created`
- [x] Implement template-service HTTP client
- [ ] Add routing logic for notification type selection
- [ ] Integrate event publisher for `notification.sent`
- [ ] Add error handling and `notification.failed` publishing

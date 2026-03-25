# Services Index

This document serves as a registry of all services in the Notification Platform.

## Services

### user-service
- **Location:** `services/user-service/`
- **AI Entry:** `services/user-service/docs/ai/entry.md`
- **Service Spec:** `services/user-service/docs/spec/service-spec.md`
- **Responsibility:** Manages user profiles and lifecycle events
- **Events Produced:** `user.created`, `user.updated`, `user.deleted`
- **Events Consumed:** None
- **APIs:** `GET /users/:id`, `POST /users`, `PUT /users/:id`

### notification-service
- **Location:** `services/notification-service/`
- **AI Entry:** `services/notification-service/docs/ai/entry.md`
- **Service Spec:** `services/notification-service/docs/spec/service-spec.md`
- **Responsibility:** Coordinates notifications and routes messages
- **Events Produced:** `notification.sent`, `notification.failed`
- **Events Consumed:** `user.created`, `email.failed`
- **APIs:** `GET /notifications/:id`

### email-service
- **Location:** `services/email-service/`
- **AI Entry:** `services/email-service/docs/ai/entry.md`
- **Service Spec:** `services/email-service/docs/spec/service-spec.md`
- **Responsibility:** Handles email delivery
- **Events Produced:** `email.delivered`, `email.failed`
- **Events Consumed:** `notification.sent`
- **APIs:** None (event-driven only)

### template-service
- **Location:** `services/template-service/`
- **AI Entry:** `services/template-service/docs/ai/entry.md`
- **Service Spec:** `services/template-service/docs/spec/service-spec.md`
- **Responsibility:** Stores and renders notification templates
- **Events Produced:** `template.resolved`
- **Events Consumed:** None
- **APIs:** `POST /templates/resolve`, `GET /templates/:id`, `POST /templates`

### audit-service
- **Location:** `services/audit-service/`
- **AI Entry:** `services/audit-service/docs/ai/entry.md`
- **Service Spec:** `services/audit-service/docs/spec/service-spec.md`
- **Responsibility:** Stores audit logs and system activity
- **Events Produced:** None
- **Events Consumed:** `user.created`, `notification.sent`, `email.delivered`, `email.failed`, `template.resolved`
- **APIs:** `GET /audit/events`, `GET /audit/events/:id`

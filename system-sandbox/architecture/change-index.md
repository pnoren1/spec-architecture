# Change Index

Registry of cross-service changes and architectural modifications.

## Active Changes

| Change ID | Title | Status | Impacted Services |
|---|---|---|---|
| CHANGE-001 | Add User Notification Flow | In Progress | user-service, notification-service, email-service, template-service, audit-service |

## Change Documents

- [CHANGE-001: Add User Notification Flow](../specs/changes/change-add-user-notification-flow.md)

## Change Process

1. Architect creates a change document under `specs/changes/`
2. Change document references impacted service specs
3. Each service team updates their service-spec and feature-specs accordingly
4. Cross-service integration tests are defined
5. Change is rolled out incrementally per service

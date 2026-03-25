<div dir="rtl" lang="he">

<style>
  .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6, .markdown-body ul, .markdown-body ol, .markdown-body li {
    text-align: right !important;
    direction: rtl !important;
  }
</style>

# 📘 מתודולוגיה לניהול ארכיטקטורה ו-SPEC במערכות מרובות REPO

גירסה 1.0.0 | מרץ 2026 | Pnina Oren

## 🎯 מטרה

מסמך זה מגדיר מתודולוגיה מומלצת לעבודה בארגון שבו קיימים מספר רב של מאגרי קוד (Repositories) כחלק ממערכת מבוזרת.

המטרה היא לאפשר:

* הבנה מהירה של המערכת
* ניהול שינויי מערכת מורכבים
* עבודה עקבית בין צוותים
* שימוש יעיל בכלי AI לפיתוח

המתודולוגיה מבוססת על היררכיית SPEC בשלוש רמות:

* רמת מערכת (System)
* רמת שירות (Service)
* רמת פיצ'ר (Feature)

מבנה זה מאפשר הפרדה ברורה בין ידע אפיוני וארכיטקטוני ברמת המערכת לבין ידע ספציפי של שירותים ופיצ'רים.  
**חשוב!** המסמך מתאר מתודולוגיה, הביצוע בפועל נוצר באמצעות פרומפטים מוכנים ייעודיים, עליהם יש לעבור ולתקף את התוצרים.


---

# 🏗️ 1. מבנה Workspace

במערכת הכוללת ריבוי Repositories וצוותים, יש להבחין בין סוגים שונים של Workspaces.  

### עקרון מנחה

**מידע קבוע ומתמשך** ← ראוי ליצירת מסמכי docs ונשמר ב־System / Team Workspaces  
**מידע זמני ותלוּי יוזמה** ← מצריך שיקול דעת האם  יש צורך במסמכי docs שיישמרו ב־Feature Workspaces  
מסמכי docs מייצרים **פעם אחת** בלבד  
צורת העבודה היא **מלמטה ללמעלה**: מייצרים קודם כל מסמכי docs עבור כל REPO ← ורק אח"כ מייצרים מסמכי docs עבור ה Workspace  

---

## 📦 1.1 סוגי Workspace

### 1. System Workspace

**תפקיד:** מקור האמת המערכתי (System-Level Source of Truth)

**מאפיינים:** מייצג את המערכת כולה, יציב לאורך זמן, אינו תלוי צוות או פיצ’ר ספציפי

**כולל:**
- System Overview (גבולות מערכת, שירותים, flows מרכזיים)
- Services Index (רשימת שירותים, קישורים ל-repos ול-SPECים)
- Cross-Service Contracts (APIs לוגיים, events, schemas)
- Architectural Decision Records (ADR)
- Standards / Conventions

**לא כולל:**
- פירוט פנימי של שירותים
- לוגיקה או מימושים

---

### 2. Team / Domain Workspace

**תפקיד:** מקור האמת של שירותים בבעלות צוות

**מאפיינים:** קבוע ויציב, משויך לצוות או דומיין, מייצג ownership ברור

**כולל:**
- רשימת השירותים של הצוות
- SPECים מלאים של השירותים (או קישורים אליהם בתוך ה-repos)
- תיעוד פנימי רלוונטי לצוות

**לא כולל:**
- תיעוד מערכת כולל
- flows רוחביים בין מספר צוותים (אלא אם מצומצם להקשר הצוות)

---

### 3. Feature Workspace

**תפקיד:** סביבת עבודה לפיתוח פיצ’ר או יוזמה (Working Space)

**מאפיינים:** זמני, ממוקד פיצ’ר / פרויקט, חוצה צוותים ושירותים

**כולל:**
- תיאור הפיצ’ר (overview)
- flow end-to-end
- רשימת שירותים מושפעים
- שינויים נדרשים / gaps
- שאלות פתוחות

**לא כולל:**
- SPECים מלאים של שירותים
- שכפול מידע קיים
- מקור אמת מתמשך

**הנחיה מרכזית:**
יש להפנות (link) ל-SPECים ול-repos הקיימים, ולא להעתיקם.

---

## 📏 1.2 חוקי שימוש

- SPEC של שירות מתועד ב-Team Workspace או ב-repo של השירות בלבד  
- חוזים בין שירותים מתועדים ב-System Workspace  
- flows זמניים ופיתוח פיצ’רים מתועדים ב-Feature Workspace  
- אין לשכפל מידע בין Workspaces – יש להשתמש בקישורים  
- לכל Workspace חייב להיות סוג מוגדר (system / team / feature)  
- ההפרדה בין System / Team / Feature היא קונספטואלית,
ולכן היא צריכה להיות גם פיזית  
אין לערבב תיעוד מסוגים שונים באותה תיקיית `docs`.  
כל Workspace מנהל תיקיית `docs` עצמאית, בהתאם לסוגו

---

## 🏷️ 1.3 הגדרת סוג ה-Workspace

לכל Workspace חובה לזהות ולהצהיר על הסוג שלו (system / team / feature).

### דרך מימוש: הצהרה ב-README

הדרך המינימלית היא לציין בראש קובץ ה-README של ה-Workspace את הפרטים הבאים:

<div dir="ltr">

```
Type: <system | team | feature>
Owner: <team-name>
Scope: <short description>
```
</div>

### הרחבה אפשרית: קובץ הגדרה workspace.yaml

לצרכים מתקדמים (כגון אוטומציה, כלי CI, או כלי AI שצריכים לקרוא את סוג ה-Workspace באופן תכנותי), ניתן להוסיף קובץ הגדרה בתיקיית docs של ה-Workspace:

<div dir="ltr">

```yaml
type: <system | team | feature>
name: <workspace-name>
owner: <team-name>
```
</div>

 
## 🗂️ 1.4 תרשים מבנה ה Workspace
תרשים זה מתאר סוגים שונים של workspaces עם תיקיות שונות עבור כל סוג
<div dir="ltr">

```
workspace
│
├─ system-workspace
│  └─ docs
│     ├─ architecture
│     │  ├─ system-overview.md    ← System
│     │  └─ services-index.md     ← System
│     ├─ specs
│     |  └─ system-spec.md        ← System
|     ├─ workspace.yaml
│     └─ README.md
|
├─ team-a-workspace
│  └─ docs
│     ├─ architecture
│     │  ├─ team-a-overview.md    ← Team / Domain
│     │  └─ services-index.md     ← Team / Domain
│     ├─ specs
│     |  └─ team-a-spec.md        ← Team / Domain
|     ├─ workspace.yaml
│     └─ README.md
|
├─ feature-x-workspace
│  └─ docs
│     ├─ feature-x-overview.md   ← Feature
|     ├─ workspace.yaml
│     └─ README.md
│
├─ repo-a
├─ repo-b
└─ repo-c

```
</div>


## 🔭 1.5 System Overview

קובץ:
<div dir="ltr">

```
docs/architecture/system-overview.md
```
</div>

קובץ זה מספק תיאור כללי של המערכת.

תוכן אופייני:

* גבולות המערכת
* השירותים הקיימים במערכת
* תחומי הדומיין
* זרימות מרכזיות (flows)
* אירועים בין שירותים
* APIs בין שירותים

מטרת הקובץ היא לאפשר להבין את המערכת **מבלי לפתוח אף Repository**.

דוגמה:
<div dir="ltr">

```markdown
# System Overview — Notification Platform

## System Boundaries

- Inbound: User registration events from external identity provider
- Outbound: Email delivery via external SMTP provider
- Internal: All inter-service communication via event bus and REST APIs
- External Consumers: Admin dashboard (reads audit logs)

## Domains

| Domain | Services |
|---|---|
| User Management | user-service |
| Messaging | notification-service, email-service, template-service |
| Compliance | audit-service |

## Services

| Service | Responsibility |
|---|---|
| user-service | Manages user profiles and lifecycle events |
| notification-service | Coordinates notifications and routes messages |
| email-service | Handles email delivery |
| template-service | Stores and renders notification templates |
| audit-service | Stores audit logs and system activity |

## Key Flows

### User Welcome Email Flow
1. `user-service` publishes `user.created`
2. `notification-service` consumes event, fetches user details and resolves template
3. `notification-service` publishes `notification.sent`
4. `email-service` consumes event, sends email via SMTP
5. `email-service` publishes `email.delivered` or `email.failed`
6. `audit-service` logs all events throughout the flow

### Email Retry Flow
1. `email-service` publishes `email.failed` with `retryable: true`
2. `notification-service` consumes event and re-triggers delivery
3. Retry uses exponential backoff, max 3 attempts

## Event Bus

| Event | Producer | Consumers |
|---|---|---|
| `user.created` | user-service | notification-service, audit-service |
| `notification.sent` | notification-service | email-service, audit-service |
| `email.delivered` | email-service | audit-service |
| `email.failed` | email-service | notification-service, audit-service |

## APIs (Synchronous)

| Endpoint | Service | Consumers |
|---|---|---|
| `GET /users/:id` | user-service | notification-service |
| `POST /templates/resolve` | template-service | notification-service |
| `GET /audit/events` | audit-service | (external / admin) |
```
</div>

## 📇 1.6 Services Index

קובץ:
<div dir="ltr">

```
docs/architecture/services-index.md
```
</div>

קובץ זה מהווה אינדקס ומפה של כל השירותים במערכת.

תוכן אופייני:

* שם השירות
* תחום הדומיין
* מיקום ה-Repository
* שירותים שעליהם השירות תלוי
* אירועים שהשירות מפרסם
* אירועים שהשירות צורך


### מטרת האינדקס היא לאפשר להבין במהירות:

* אילו שירותים קיימים במערכת
* כיצד השירותים תלויים זה בזה
* אילו שירותים עשויים להיות מושפעים משינוי

האינדקס מאפשר גם לכלי AI להבין את מבנה המערכת מבלי לסרוק קוד.

דוגמה:
<div dir="ltr">

```markdown
# Services Index — Notification Platform

### notification-service
- **Domain:** Messaging
- **Location:** `services/notification-service/`
- **AI Entry:** `services/notification-service/docs/context/service-context.md`
- **Service Spec:** `services/notification-service/docs/specs/service-spec.md`
- **Responsibility:** Coordinates notifications and routes messages to delivery channels
- **Dependencies:** user-service (REST), template-service (REST)
- **Events Produced:** `notification.sent`
- **Events Consumed:** `user.created`, `email.failed`
- **APIs:** `GET /notifications/:userId`

### email-service
- **Domain:** Messaging
- **Location:** `services/email-service/`
- **AI Entry:** `services/email-service/docs/context/service-context.md`
- **Service Spec:** `services/email-service/docs/specs/service-spec.md`
- **Responsibility:** Handles email delivery via SMTP
- **Dependencies:** notification-service (events), external SMTP provider
- **Events Produced:** `email.delivered`, `email.failed`
- **Events Consumed:** `notification.sent`
- **APIs:** None (event-driven only)

### audit-service
- **Domain:** Compliance
- **Location:** `services/audit-service/`
- **AI Entry:** `services/audit-service/docs/context/service-context.md`
- **Service Spec:** `services/audit-service/docs/specs/service-spec.md`
- **Responsibility:** Stores audit logs and system activity
- **Dependencies:** None
- **Events Produced:** None
- **Events Consumed:** `user.created`, `notification.sent`, `email.delivered`, `email.failed`
- **APIs:** `GET /audit/events`
```
</div>


## 📋 1.7 System SPEC

קובץ:
<div dir="ltr">

```
docs/specs/system-spec.md
```
</div>

קובץ זה מתאר את ה-SPEC ברמת המערכת.

תוכן אופייני:

* דרישות מערכת
* ארכיטקטורה כללית
* החלטות עיצוב מערכתיות
* סטנדרטים ארגוניים
* עקרונות ארכיטקטורה

דוגמה:
<div dir="ltr">

```markdown
# System Specification — Notification Platform

## System Requirements

### Functional Requirements
- The system shall deliver notifications to users via email upon lifecycle events
- The system shall support templated messages with dynamic content resolution
- The system shall maintain a complete audit trail of all system activity
- The system shall retry failed email deliveries automatically

### Non-Functional Requirements
- Event delivery: at-least-once semantics
- Email retry: exponential backoff, max 3 attempts
- Audit logs: immutable, append-only, retained for 90 days
- API response time: < 200ms (p95) for synchronous calls
- System availability: 99.9% uptime target

## Architecture Overview

- Communication model: event-driven (async) + REST (sync)
- Event bus: RabbitMQ with durable queues
- Each service owns its own data store (Database per Service)
- No shared databases between services
- All inter-service contracts are versioned

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Async over Sync | Event-driven as default | Reduces coupling, improves resilience |
| Database per Service | Each service owns its DB | Enforces bounded contexts, independent deployments |
| Template resolution | Sync REST call | Templates needed before send, low latency required |
| Retry ownership | email-service owns retries | Keeps retry logic close to the delivery mechanism |
| Audit as consumer | audit-service listens to all events | Decoupled from business logic, no impact on flows |

## Standards & Conventions

- Event naming: `<domain>.<past-tense-verb>` (e.g. `user.created`, `email.delivered`)
- Event schema: all events must include `eventId`, `timestamp`, `source`
- API versioning: URL path prefix (`/v1/`, `/v2/`)
- Error responses: RFC 7807 Problem Details format
- Logging: structured JSON, must include `correlationId`
- Health checks: every service exposes `GET /health`

## Architecture Principles

- **Loose Coupling:** services communicate via events; direct dependencies are minimized
- **Single Responsibility:** each service owns one domain and one data store
- **Observability First:** all services emit structured logs and health endpoints
- **Immutable Audit:** audit records are append-only and never modified
- **Graceful Degradation:** failure in one service must not cascade to others
```
</div>


## � 1.8 מסמכי Team / Domain Workspace

ה-Team Workspace עוקב אחרי מבנה דומה ל-System Workspace, אך בהיקף מצומצם לשירותים שבבעלות הצוות.

### Team Overview

קובץ:
<div dir="ltr">

```
docs/architecture/team-overview.md
```
</div>

קובץ זה מספק תיאור כללי של תחום האחריות של הצוות והשירותים שבבעלותו.

בניגוד ל-System Overview שמתאר את המערכת כולה, קובץ זה ממוקד בדומיין הספציפי של הצוות.

תוכן אופייני:

* תחום האחריות של הצוות
* השירותים שבבעלות הצוות
* זרימות מרכזיות בתוך הדומיין
* נקודות ממשק עם צוותים אחרים

דוגמה:
<div dir="ltr">

```markdown
# Team Overview — Messaging Team

## Ownership

The Messaging team owns all services related to notification delivery and email communication.

## Services

| Service | Responsibility |
|---|---|
| notification-service | Coordinates notifications and routes messages |
| email-service | Handles email delivery via SMTP |
| template-service | Stores and renders notification templates |

## Key Flows

### Notification Delivery Flow
1. `notification-service` receives trigger event
2. Fetches user preferences and resolves template
3. Routes to appropriate delivery channel (currently: email only)
4. `email-service` delivers via SMTP

## Integration Points with Other Teams

| Team | Interface | Purpose |
|---|---|---|
| User Management | `user.created` event, `GET /users/:id` API | Trigger notifications, fetch user data |
| Compliance | `email.delivered`, `email.failed` events | Audit logging |
```
</div>

### Team Services Index

קובץ:
<div dir="ltr">

```
docs/architecture/services-index.md
```
</div>

זהה במבנה ל-Services Index המערכתי (סעיף 1.6), אך כולל רק את השירותים שבבעלות הצוות.

מטרתו לאפשר ניווט מהיר בין שירותי הצוות, כולל קישורים ל-repos ול-SPECים.

### Team SPEC

קובץ:
<div dir="ltr">

```
docs/specs/team-spec.md
```
</div>

קובץ זה מתאר את ה-SPEC ברמת הצוות / הדומיין.

תוכן אופייני:

* אחריות הצוות
* עקרונות עיצוב ספציפיים לדומיין
* סטנדרטים פנימיים של הצוות
* קישורים ל-Service SPECs של השירותים שבבעלות הצוות

דוגמה:
<div dir="ltr">

```markdown
# Team Specification — Messaging Team

## Responsibilities

- Own the full notification delivery pipeline
- Ensure reliable email delivery with retry mechanisms
- Manage notification templates and rendering

## Domain Design Principles

- All delivery channels are event-driven
- Template resolution is synchronous (low latency requirement)
- Retry logic is owned by the delivery service, not the coordinator

## Team Standards

- All events follow the naming convention: `<domain>.<past-tense-verb>`
- Every handler must log `correlationId` for traceability
- New delivery channels must be added as separate services

## Service Specifications

- [notification-service Spec](../../services/notification-service/docs/specs/service-spec.md)
- [email-service Spec](../../services/email-service/docs/specs/service-spec.md)
- [template-service Spec](../../services/template-service/docs/specs/service-spec.md)
```
</div>

---

## 🎯 1.9 מסמכי Feature Workspace

ה-Feature Workspace הוא זמני וממוקד ביוזמה ספציפית. המסמכים שלו שונים מהותית מ-System ו-Team כי הם מתארים שינוי מתוכנן ולא מצב קיים.

### Feature Overview

קובץ:
<div dir="ltr">

```
docs/feature-overview.md
```
</div>

קובץ זה מתאר את הפיצ'ר או היוזמה, כולל ההשפעה על שירותים קיימים.

תוכן אופייני:

* מטרת הפיצ'ר
* Flow מקצה לקצה
* שירותים מושפעים ושינויים נדרשים בכל אחד מהם
* Gaps ושאלות פתוחות
* קישורים ל-SPECים ול-repos הרלוונטיים

דוגמה:
<div dir="ltr">

```markdown
# Feature Overview — SMS Notification Channel

## Purpose

Add SMS as a new delivery channel alongside email.
Users will be able to receive notifications via SMS based on their preferences.

## End-to-End Flow

1. `notification-service` receives trigger event
2. Fetches user preferences (email / SMS / both)
3. For SMS: publishes `notification.sms.requested`
4. New `sms-service` consumes event and sends via SMS provider
5. `sms-service` publishes `sms.delivered` or `sms.failed`
6. `audit-service` logs all SMS events

## Affected Services

| Service | Change Required |
|---|---|
| notification-service | Add SMS routing logic, publish new event |
| user-service | Add SMS preference to user profile |
| audit-service | Consume new SMS events |
| sms-service | **New service** — SMS delivery via external provider |

## Gaps & Open Questions

- [ ] Which SMS provider to use? (Twilio / AWS SNS)
- [ ] Should SMS retry logic mirror email retry?
- [ ] Rate limiting for SMS — per user or global?
- [ ] Regulatory requirements for SMS opt-in/opt-out

## Related Documents

- [System Overview](../system-workspace/docs/architecture/system-overview.md)
- [notification-service Spec](../services/notification-service/docs/specs/service-spec.md)
- [user-service Spec](../services/user-service/docs/specs/service-spec.md)
```
</div>

**הערה:** ב-Feature Workspace אין צורך ב-Services Index או Architecture נפרדים.
המידע הרלוונטי מרוכז ב-Feature Overview, ולפרטים נוספים יש להפנות למסמכים הקיימים ב-System ו-Team Workspaces.

---


# 📦 2. מבנה Repository

כל שירות במערכת מנוהל ב-Repository נפרד.

מבנה מומלץ:
<div dir="ltr">

```
repo-name
│
├─ src
├─ tests
│
├─ docs
│  ├─ context
│  │   └─ service-context.md
│  ├─ repo-overview.md
│  ├─ architecture.md
│  ├─ code-map.md
│  └─ specs
│      ├─ service-spec.md
│      └─ features
│          ├─ feature-a-spec.md
│          └─ feature-b-spec.md
│
├─ .kiro            # => אם משתמשים עם KIRO
│   ├─ specs
│   └─ steering
│
└─ _bmad-output     # => אם משתמשים עם BMAD
```
</div>


## 🤖 2.1 Context

קובץ:
<div dir="ltr">

```
docs/context/service-context.md
```
</div>
קובץ זה משמש נקודת כניסה לכלי AI להבנת השירות.

תוכן אופייני:

* מה השירות עושה
* היכן נמצאים מסמכי השירות (overview, architecture, code map)
* היכן נמצא ה-Service SPEC וה-Feature SPECs
* היכן נמצאים קבצי steering ו-specs שנוצרו על ידי כלים (כגון KIRO או BMAD)
* איפה נמצאים קבצים מערכתיים קשורים (ברמת המערכת כולה שרלוונטים לשירות להכיר ולעבוד לפיהם)

קובץ זה יעיל במיוחד עבור כלי AI.

דוגמה:
<div dir="ltr">

```
# AI Entry — email-service

This is the main navigation point for AI-assisted exploration of email-service.

## Service Documents

- [Repository Overview](../repo-overview.md) — What this repo contains and how to work with it
- [Architecture](../architecture.md) — Internal architecture and design decisions
- [Code Map](../code-map.md) — Source code structure and key files

## KIRO Steering Files

- .kiro/steering/architecture.md
- .kiro/steering/patterns.md

## Specifications

- [Service Spec](../spec/service-spec.md) — Service responsibilities, APIs, events, dependencies
- [Feature: Email Delivery](../spec/features/email-delivery.md)
- [Feature: Email Retry Mechanism](../spec/features/email-retry-mechanism.md)

## Generated specs

- .kiro/specs/
- _bmad-output/

## System-Level Documents

- [System Overview](../../../../architecture/system-overview.md)
- [Services Index](../../../../architecture/services-index.md)
- [System Spec](../../../../specs/system-spec.md)
- [Change: Add User Notification Flow](../../../../specs/changes/change-add-user-notification-flow.md)

## Quick Context

- **Responsibility:** Handles email delivery via SMTP
- **Events Produced:** `email.delivered`, `email.failed`
- **Events Consumed:** `notification.sent`
- **APIs:** None (event-driven only)
- **Dependencies:** SMTP provider, event bus

```
</div>



## 📄 2.2 Repo Overview

קובץ:
<div dir="ltr">

```
docs/repo-overview.md
```
</div>
קובץ זה מתאר את השירות ברמה עסקית וארכיטקטונית.

תוכן:

* לאיזה Domain השירות שייך
* מה השירות עושה
* גבולות האחריות של השירות
* כיצד השירות משתלב במערכת הכוללת
* Tech Stack

קובץ זה עשוי להקביל למסמך ה product שניתן לייצר עם KIRO Steering files
ולכן אם הוא קיים - אפשר לקשר אליו

דוגמה:
<div dir="ltr">

```markdown
# Repository Overview — email-service

## Domain

Messaging

## Purpose

The email-service is responsible for delivering emails.
It consumes `notification.sent` events, formats the email,
sends it via SMTP, and publishes delivery status events.

## Boundaries

- Owns: email formatting and SMTP delivery
- Does NOT own: notification routing, template resolution, user data
- Input: events from notification-service
- Output: delivery status events (email.delivered, email.failed)

## System Integration

- Consumes `notification.sent` events from notification-service
- Publishes `email.delivered` and `email.failed` events consumed by audit-service and notification-service
- No synchronous API — fully event-driven

## Tech Stack

- Runtime: Node.js
- SMTP: Nodemailer
- Event Bus: RabbitMQ
```
</div>


## 🏛️ 2.3 Architecture

קובץ:
<div dir="ltr">

```
docs/architecture.md
```
</div>

קובץ זה מתאר את הארכיטקטורה של השירות.

תוכן אופייני:

* החלטות עיצוב (Design Decisions)
* אינטראקציות עם שירותים אחרים
* event flows מרכזיים
* APIs
* דיאגרמות זרימה

קובץ זה עשוי להקביל למסמכי ה structure + tech שניתן לייצר עם KIRO Steering files
ולכן אם הם קיימים - אפשר לקשר אליהם

דוגמה:
<div dir="ltr">

```markdown
# Architecture — email-service

## Design Decisions

- **Event-driven only:** No REST API; all work is triggered by events
- **Retry with backoff:** Failed deliveries are retried with exponential backoff
- **Provider abstraction:** SMTP provider is abstracted for easy swapping

## Service Interactions

| Service | Direction | Method | Purpose |
|---|---|---|---|
| notification-service | Inbound | Event (`notification.sent`) | Triggers email delivery |
| audit-service | Outbound | Event (`email.delivered`, `email.failed`) | Audit logging |
| notification-service | Outbound | Event (`email.failed`) | Triggers retry flow |

## APIs

This service does not expose any REST APIs. All communication is event-driven.

## Email Delivery Flow

1. Consume `notification.sent` event
2. Format email (to, subject, body from event payload)
3. Send via SMTP provider
4. Publish `email.delivered` or `email.failed`
```
</div>


## 🗺️ 2.4 Code Map

קובץ:
<div dir="ltr">

```
docs/code-map.md
```
</div>

קובץ זה מסביר את מבנה הקוד של השירות.

תוכן:

* מבנה תיקיות
* רכיבים מרכזיים
* נקודות כניסה לקוד

המטרה היא לאפשר להבין **היכן דברים נמצאים** מבלי לסרוק את כל הקוד.

דוגמה:
<div dir="ltr">

```markdown
# Code Map — email-service

## Source Structure

| Path | Description |
|---|---|
| `src/index.js` | Application entry point, starts event consumers |
| `src/handlers/notificationSentHandler.js` | Handles `notification.sent` events |
| `src/services/emailSender.js` | SMTP email sending logic |
| `src/events/publisher.js` | Event bus publisher for delivery status |
```
</div>


## 📋 2.5 Service SPEC

קובץ:
<div dir="ltr">

```
docs/specs/service-spec.md
```
</div>

זהו מסמך ה-SPEC המרכזי של השירות.

תוכן אופייני:

* אחריות השירות
* קישורים ל-Feature SPECs
* קישורים ל-specs שנוצרו על ידי כלים (כגון KIRO או BMAD)
* שירותים תלויים
* אירועים שהשירות מפרסם
* אירועים שהשירות צורך
* APIs שהשירות מספק
* מבנה פנימי של השירות

כאשר משתמשים בכלים שמייצרים קבצי SPEC (כגון KIRO או BMAD), אין לשכפל SPEC.

במקום זאת יש להפנות אל הקבצים שנוצרו על ידי הכלים באמצעות link

דוגמה:
<div dir="ltr">

```markdown
# Service Specification — email-service

## Responsibilities

- Consume notification events and deliver emails via SMTP
- Manage email delivery retries with exponential backoff
- Publish delivery status events

## Features Specifications

- [Feature: Email Delivery](./features/email-delivery.md)
- [Feature: Email Retry Mechanism](./features/email-retry-mechanism.md)

## Generated specs

- `.kiro/specs/`
- `_bmad-output/`

## Dependencies

| Service | Method | Purpose |
|---|---|---|
| notification-service | Event (`notification.sent`) | Triggers email delivery |
| External SMTP provider | SMTP | Email delivery |

## Events Produced

| Event | Schema | Trigger |
|---|---|---|
| `email.delivered` | `{ emailId, notificationId, deliveredAt }` | Email successfully sent |
| `email.failed` | `{ emailId, notificationId, reason, retryable }` | Email delivery failed |

## Events Consumed

| Event | Source | Handler |
|---|---|---|
| `notification.sent` | notification-service | `NotificationSentHandler` — sends email |

## APIs

This service does not expose any REST APIs. All communication is event-driven.

## Internal Structure

| Component | Responsibility |
|---|---|
| `NotificationSentHandler` | Consumes events and triggers email sending |
| `EmailSender` | SMTP email sending logic |
| `Publisher` | Publishes delivery status events |
```
</div>


## 🧩 2.6 Feature SPEC

קבצי SPEC ברמת פיצ'ר ממוקמים תחת:
<div dir="ltr">

```
docs/specs/features/
```
</div>

דוגמאות:
<div dir="ltr">

```
feature-a-spec.md
feature-b-spec.md
```
</div>

תוכן אופייני:

* מטרת הפיצ'ר
* קלטים ופלטים
* זרימות פנימיות
* אינטראקציות עם שירותים אחרים

SPECים אלו משמשים לניהול שינויי פיתוח ברמת פיצ'ר.

דוגמה:
<div dir="ltr">

```markdown
# Feature Specification — Email Delivery

## Service Context

This feature is part of email-service.
For the full service specification, see:

#[[file:../service-spec.md]]

## Purpose

Handle the delivery of emails via SMTP when a notification event is received.

## Inputs

| Input | Source | Format |
|---|---|---|
| `notification.sent` event | notification-service | `{ notificationId, to, subject, body }` |

## Outputs

| Output | Target | Format |
|---|---|---|
| `email.delivered` event | audit-service | `{ emailId, notificationId, deliveredAt }` |
| `email.failed` event | notification-service, audit-service | `{ emailId, notificationId, reason, retryable }` |

## Internal Flow

1. `NotificationSentHandler` receives event
2. Extracts recipient, subject, and body from payload
3. Calls `EmailSender.send()` with formatted email
4. On success: publishes `email.delivered`
5. On failure: publishes `email.failed` with `retryable` flag

## Service Interactions

| Service | Direction | Method | Purpose |
|---|---|---|---|
| notification-service | Inbound | Event | Receives `notification.sent` |
| audit-service | Outbound | Event | Reports delivery status |
| notification-service | Outbound | Event | Reports failure for retry |
```
</div>


# 🔄 3. תהליך הכנסת שינוי או פיצ'ר חדש למערכת

כאשר שינוי משפיע על מספר שירותים יש לפעול לפי התהליך הבא:
<div dir="ltr">

```
System Change SPEC
        ↓
Service SPEC updates
        ↓
Feature SPEC updates
        ↓
Code changes
```
</div>

גישה זו מבטיחה שכל שינוי מערכתי יתועד ברמה המתאימה.


# 🗂️ 4. ניהול היררכיות של SPEC בתוך Repository

כאשר רוצים ליצור SPEC כללי לפרוייקט שמכיל את כל הדרישות והעיצוב הטכני (והמשימות) של הפרויקט כולו, אפשר ליצור אותו בתיקיית `.kiro/specs/` ישירות ולשלב יחד איתו גם SPEC ספציפיים.

## 📂 4.1 המבנה המומלץ

<div dir="ltr">

```
.kiro/specs/
  requirements.md         # דרישות כלליות של הפרויקט
  design.md               # ארכיטקטורה כללית
  tasks.md                # משימות ברמת הפרויקט

  secure-file-distribution/  # feature ספציפי
    requirements.md
    design.md
    tasks.md

  client-file-upload-ui/     # feature ספציפי
    requirements.md
    design.md
    tasks.md
```
</div>

היתרונות:

* ✓ ה-spec הכללי מכיל את הארכיטקטורה הכוללת, תקני קוד, והחלטות עיצוב ברמת המערכת
* ✓ כל feature קטן יכול להתייחס ל-spec הכללי ולהתמקד רק בפרטים הספציפיים שלו
* ✓ אפשר לקשר בין ה-specs עם `#[[file:../requirements.md]]`


## 🔗 4.2 איך ליצור קישורים בין Specs

פשוט מוסיפים את הסינטקס `#[[file:path/to/file.md]]` בתוך קובץ ה-spec. זה עובד גם ב-requirements, design וגם ב-tasks.

### דוגמה: הוספת קישור ל-spec כללי

בקובץ `.kiro/specs/client-file-upload-ui/requirements.md`:

<div dir="ltr">

```markdown
# מסמך דרישות: פקד העלאת קבצים מצד הלקוח

## הקשר למערכת הכללית

דרישות אלו הן חלק ממערכת ה-Secure File Distribution Service.
לדרישות כלליות של המערכת, ראה:

#[[file:../requirements.md]]

## מבוא

...
```
</div>

### איך זה עובד

כשפותחים את הקובץ `client-file-upload-ui/requirements.md` ב-Kiro, הקישור `#[[file:../requirements.md]]` יהיה לחיץ ויוביל ישירות ל-spec הכללי.

### קישורים דו-כיווניים

זה עובד גם בכיוון ההפוך - אפשר להוסיף קישורים מה-spec הכללי ל-specs הספציפיים.
למשל, בקובץ `tasks.md` הכללי:

<div dir="ltr">

```markdown
## קישורים

- #[[file:requirements.md]] - דרישות מפורטות
- #[[file:design.md]] - ארכיטקטורה
- #[[file:secure-file-distribution/tasks.md]] - משימות feature ספציפי
- #[[file:client-file-upload-ui/tasks.md]] - משימות UI client
- #[[file:../../README.md]] - הוראות התקנה
```
</div>

היתרונות של שיטה זו:

* ✓ **ניווט מהיר בין מסמכים** - קליק אחד מעביר בין specs
* ✓ **Kiro יכול לקרוא אוטומטית** קבצים מקושרים כשצריך הקשר
* ✓ **מבנה היררכי ברור** - כללי ← ספציפי
* ✓ **תחזוקה קלה** - שינוי במקום אחד משפיע על כולם


## 📊 4.3 סיכום המבנה שנוצר

<div dir="ltr">

```
.kiro/specs/
├── requirements.md         ← Spec כללי: דרישות המערכת
├── design.md               ← Spec כללי: ארכיטקטורה
├── tasks.md                ← Spec כללי: משימות פרויקט
│
├── secure-file-distribution/
│   ├── requirements.md     ← Feature ספציפי
│   ├── design.md
│   └── tasks.md
│
└── client-file-upload-ui/
    ├── requirements.md     ← Feature ספציפי
    ├── design.md           (מקשר ל-spec כללי עם #[[file:../requirements.md]])
    └── tasks.md
```
</div>


# 🔀 5. ניהול שינויים וגירסאות בתהליך SDD

## 💡 עיקרון בסיסי

השאלה היא לא **האם** למזג שינויים ל-SPEC הראשי – אלא **מתי**.

בפועל עובדים עם **SPEC ראשי יציב** + **SPEC-ים משלימים** לשינויים.

כל זה בהנחה שעובדים בתצורה של MS ולכל REPO יש תחום אחריות מוגדר.

במידה ולא או שיש מורכבות גדולה - יש להקפיד על היררכיות SPEC עבור כל מודול/פיצ'ר משמעותי **מבלי למזג, יחד עם קישורים מתאימים** בכדי לא לייצר עומס על SPEC אחד.

---

## 📚 סוגי SPEC ומתי למזג

### 1️⃣ Main Spec

ה-SPEC שמגדיר את המערכת כפי שהיא אמורה לעבוד **עכשיו**.

**מתי לעדכן?** אחרי Release, כאשר יש שינויים מצטברים רבים

**מטרה:** לשמור Single Source of Truth - מקור אמת יחיד

### 2️⃣ Feature Spec

SPEC לפיצ'ר חדש. פיצ'ר שמצריך חשיבה אירגון ותכנון מפורט, אולי אפילו שינוי ארכיטקטורה וכד'.

**מתי ליצור?** לכל פיצ'ר משמעותי

**מתי למזג?** לאחר סיום פיתוח ואישור הפיצ'ר, לרוב כחלק מ-Release

### 3️⃣ Change Request / Bug Spec

עדכון קטן או שינוי התנהגות - שו"ש/משימה קטנה/באג וכד'.

**מתי ליצור?** שינוי לוגיקה, שינוי API, שינוי UX

**מתי למזג?** כאשר מסיימים את הפיתוח

### 4️⃣ Proposal / RFC Spec

SPEC לדיון בלבד.

**מתי ליצור?** כשעדיין לא ברור אם הפיצ'ר יאושר

**מתי למזג?** רק אם אושר, אחרת נשאר כ-Proposal היסטורי

---

## 🏷️ מתי ליצור גרסאות SPEC

**מומלץ ליצור גרסה כאשר:**

- ✓ יש Release גדול
- ✓ יש שינוי ארכיטקטוני משמעותי
- ✓ ה-SPEC השתנה בצורה נרחבת

**לדוגמה:**

<div dir="ltr">

```
system-spec-v1.md
system-spec-v2.md
```
</div>


## מתי לא למזג SPEC?
הפיצ'ר עדיין בניסוי, או שמדובר ב-Proposal בלבד, או שהשינוי עלול להשתנות בקרוב
**במצב כזה משאירים SPEC נפרד.**

## מתי כן למזג אבל להשאיר את ה-SPEC המקורי?

**מומלץ כאשר:** חשוב תיעוד החלטות, רוצים היסטוריית Design, ה-SPEC שימש כ-RFC

**במקרה כזה:**

<div dir="ltr">

```
spec/
  system-spec.md

proposals/
  accepted/
    feature-x-proposal.md
    feature-y-proposal.md
  rejected/
    feature-z-proposal.md
```
</div>

## 🎯 עיקרון העבודה

שינויים נכתבים ב-SPEC קטן ← מאושרים ← ממוזגים בזמן מתאים ל-SPEC הראשי




# ⚙️ 6. עקרונות עבודה מרכזיים

המתודולוגיה מבוססת על העקרונות הבאים:

* הפרדת רמות ידע

הפרדה בין: מערכת / שירות / פיצ'ר

* תיעוד לפני קוד

SPEC נכתב או מתעדכן לפני מימוש בקוד.

* הצהרת תלות מפורשת

כל שירות מצהיר על: APIs, events, dependencies

* ארכיטקטורה ידידותית ל-AI

מבנה התיעוד מאפשר לכלי AI לנווט במערכת מבלי לסרוק קוד רב.


# ✅ 7. יתרונות המתודולוגיה

יישום מתודולוגיה זו מאפשר:

* הבנה מהירה של מערכות גדולות
* עבודה יעילה עם עשרות Repositories
* שימוש אפקטיבי בכלי AI לפיתוח
* מניעת חוסר עקביות בין שירותים
* ניהול נכון של שינויי מערכת מורכבים

</div>

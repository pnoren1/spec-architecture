# API Methods Color Demo

## Option 1 — HTML Spans with inline styles

| Method | Path | Description |
|---|---|---|
| <span style="background-color:#61affe;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">GET</span> | `/api/notifications` | List all notifications |
| <span style="background-color:#49cc90;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">POST</span> | `/api/notifications/send` | Send a new notification |
| <span style="background-color:#fca130;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">PUT</span> | `/api/notifications/:id` | Update a notification |
| <span style="background-color:#fca130;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">PATCH</span> | `/api/notifications/:id/read` | Mark notification as read |
| <span style="background-color:#f93e3e;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;font-size:0.85em;">DELETE</span> | `/api/notifications/:id` | Delete a notification |

---

## Option 2 — Same colors, rounder badges (more Swagger-like)

| Method | Path | Description |
|---|---|---|
| <span style="background-color:#61affe;color:white;padding:3px 10px;border-radius:12px;font-weight:bold;font-size:0.8em;">GET</span> | `/api/users` | Get all users |
| <span style="background-color:#49cc90;color:white;padding:3px 10px;border-radius:12px;font-weight:bold;font-size:0.8em;">POST</span> | `/api/users` | Create a user |
| <span style="background-color:#fca130;color:white;padding:3px 10px;border-radius:12px;font-weight:bold;font-size:0.8em;">PUT</span> | `/api/users/:id` | Replace user data |
| <span style="background-color:#fca130;color:white;padding:3px 10px;border-radius:12px;font-weight:bold;font-size:0.8em;">PATCH</span> | `/api/users/:id` | Partial update |
| <span style="background-color:#f93e3e;color:white;padding:3px 10px;border-radius:12px;font-weight:bold;font-size:0.8em;">DELETE</span> | `/api/users/:id` | Delete a user |

---

## Color Reference

| Method | Color | Hex |
|---|---|---|
| GET | 🔵 Blue | `#61affe` |
| POST | 🟢 Green | `#49cc90` |
| PUT | 🟠 Orange | `#fca130` |
| PATCH | 🟠 Orange | `#fca130` |
| DELETE | 🔴 Red | `#f93e3e` |

> These are the standard Swagger/OpenAPI UI colors.

---

## Note

Markdown rendering of inline HTML depends on the viewer:
- ✅ **GitHub** — renders HTML spans in tables
- ✅ **VS Code Preview** — renders HTML spans in tables
- ⚠️ **Some static site generators** — may strip inline styles (security)
- ✅ **GitLab** — generally works

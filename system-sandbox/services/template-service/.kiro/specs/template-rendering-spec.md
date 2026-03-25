# KIRO Spec: Template Rendering

## Status: Draft

## Requirements
- Resolve templates with dynamic data via POST /templates/resolve
- Use Handlebars for interpolation
- Publish `template.resolved` event

## Tasks
- [x] Implement POST /templates/resolve endpoint
- [ ] Add Handlebars compilation and rendering
- [ ] Add missing variable detection
- [ ] Integrate event publishing for audit

# KIRO Spec: User Profile Update

## Status: Draft

## Requirements
- Users can update their name and email
- Changes publish `user.updated` event with diff
- Email uniqueness enforced on update

## Tasks
- [x] Define PUT /users/:id endpoint
- [ ] Implement partial update logic
- [ ] Add change detection for event payload
- [ ] Add validation for updated fields

// User route handlers
const router = require('express').Router();
const userService = require('../services/userService');

router.get('/:id', async (req, res) => {
  // TODO: implement get user by ID
  res.json({ id: req.params.id, email: 'placeholder', name: 'placeholder' });
});

router.post('/', async (req, res) => {
  // TODO: implement user creation + event publishing
  res.status(201).json({ id: 'generated-uuid', ...req.body, createdAt: new Date() });
});

router.put('/:id', async (req, res) => {
  // TODO: implement user update + event publishing
  res.json({ id: req.params.id, ...req.body, updatedAt: new Date() });
});

module.exports = router;

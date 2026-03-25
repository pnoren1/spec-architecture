// Template route handlers
const router = require('express').Router();
const templateService = require('../services/templateService');

router.get('/:id', async (req, res) => {
  // TODO: fetch template by ID
  res.json({ id: req.params.id, name: 'welcome-email', version: 1 });
});

router.post('/', async (req, res) => {
  // TODO: create template
  res.status(201).json({ id: 'generated-uuid', ...req.body, version: 1 });
});

router.post('/resolve', async (req, res) => {
  // TODO: resolve template with data
  res.json({ subject: 'Welcome', body: 'Hello, placeholder' });
});

module.exports = router;

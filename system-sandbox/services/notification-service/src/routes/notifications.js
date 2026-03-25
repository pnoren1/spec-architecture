// Notification route handlers
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  // TODO: fetch notification status
  res.json({ id: req.params.id, status: 'sent', channel: 'email' });
});

module.exports = router;

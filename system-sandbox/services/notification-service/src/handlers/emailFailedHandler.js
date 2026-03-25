// Event handler for email.failed
const notificationService = require('../services/notificationService');

module.exports = {
  async start() {
    // TODO: subscribe to email.failed on event bus
    console.log('[notification-service] Listening for email.failed events');
  },

  async handle(event) {
    await notificationService.handleEmailFailed(event);
  },
};

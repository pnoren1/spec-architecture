// Event handler for user.created
const notificationService = require('../services/notificationService');

module.exports = {
  async start() {
    // TODO: subscribe to user.created on event bus
    console.log('[notification-service] Listening for user.created events');
  },

  async handle(event) {
    await notificationService.handleUserCreated(event);
  },
};

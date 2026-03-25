// Event handler for notification.sent
const emailSender = require('../services/emailSender');
const publisher = require('../events/publisher');

module.exports = {
  async start() {
    // TODO: subscribe to notification.sent on event bus
    console.log('[email-service] Listening for notification.sent events');
  },

  async handle(event) {
    try {
      await emailSender.send(event.payload);
      await publisher.publish('email.delivered', {
        emailId: 'generated-uuid',
        notificationId: event.notificationId,
        deliveredAt: new Date(),
      });
    } catch (err) {
      await publisher.publish('email.failed', {
        emailId: 'generated-uuid',
        notificationId: event.notificationId,
        reason: err.message,
        retryable: true,
      });
    }
  },
};

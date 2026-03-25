// Notification orchestration logic
class NotificationService {
  async handleUserCreated(event) {
    // TODO: fetch user, resolve template, publish notification.sent
    console.log('[notification-service] Handling user.created:', event);
  }

  async handleEmailFailed(event) {
    // TODO: evaluate retry policy
    console.log('[notification-service] Handling email.failed:', event);
  }
}

module.exports = new NotificationService();

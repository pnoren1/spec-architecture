// HTTP client for user-service
class UserClient {
  constructor() {
    this.baseUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
  }

  async getUserById(userId) {
    // TODO: GET /users/:id
    console.log(`[notification-service] Fetching user ${userId}`);
    return { id: userId, email: 'placeholder', name: 'placeholder' };
  }
}

module.exports = new UserClient();

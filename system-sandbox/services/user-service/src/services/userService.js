// User business logic
class UserService {
  async createUser(data) {
    // TODO: validate, persist, publish event
    return { id: 'generated-uuid', ...data, createdAt: new Date() };
  }

  async updateUser(id, changes) {
    // TODO: validate, persist, publish event
    return { id, ...changes, updatedAt: new Date() };
  }

  async getUserById(id) {
    // TODO: fetch from database
    return { id, email: 'placeholder', name: 'placeholder' };
  }
}

module.exports = new UserService();

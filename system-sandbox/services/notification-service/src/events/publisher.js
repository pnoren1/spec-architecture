// Event publisher placeholder
class EventPublisher {
  async publish(eventName, payload) {
    // TODO: publish to RabbitMQ
    console.log(`[notification-service] Publishing ${eventName}:`, payload);
  }
}

module.exports = new EventPublisher();

// Generic event consumer for all event types
const auditService = require('../services/auditService');

module.exports = {
  async start() {
    // TODO: subscribe to all relevant events on event bus
    console.log('[audit-service] Listening for all system events');
  },

  async handle(event) {
    const auditRecord = {
      type: event.type,
      source: event.source,
      payload: event.payload,
      correlationId: event.correlationId,
      timestamp: event.timestamp || new Date(),
    };
    await auditService.storeEvent(auditRecord);
  },
};

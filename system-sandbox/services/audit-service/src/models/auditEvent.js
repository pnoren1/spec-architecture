// Audit event data model placeholder
const AuditEventSchema = {
  id: 'UUID',
  type: 'string',
  source: 'string',
  payload: 'JSONB',
  correlationId: 'UUID',
  timestamp: 'timestamp',
  createdAt: 'timestamp',
};

module.exports = { AuditEventSchema };

// HTTP client for template-service
class TemplateClient {
  constructor() {
    this.baseUrl = process.env.TEMPLATE_SERVICE_URL || 'http://localhost:3004';
  }

  async resolveTemplate(templateId, data) {
    // TODO: POST /templates/resolve
    console.log(`[notification-service] Resolving template ${templateId}`);
    return { subject: 'Welcome', body: 'Hello, placeholder' };
  }
}

module.exports = new TemplateClient();

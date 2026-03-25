// Template business logic
class TemplateService {
  async createTemplate(data) {
    // TODO: validate, persist
    return { id: 'generated-uuid', ...data, version: 1 };
  }

  async getTemplateById(id) {
    // TODO: fetch from database
    return { id, name: 'welcome-email', subject: 'Welcome {{name}}', body: 'Hello {{name}}', version: 1 };
  }

  async resolveTemplate(templateId, data) {
    // TODO: load template, compile Handlebars, render
    return { subject: 'Welcome', body: `Hello, ${data.name || 'user'}` };
  }
}

module.exports = new TemplateService();

// SMTP email sending logic
class EmailSender {
  async send({ to, subject, body }) {
    // TODO: send via SMTP provider (nodemailer)
    console.log(`[email-service] Sending email to ${to}: ${subject}`);
  }
}

module.exports = new EmailSender();

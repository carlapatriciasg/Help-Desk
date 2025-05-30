
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Configuração do transporte (SMTP, Gmail, etc.)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "podlegends807@gmail.com", // Armazenado em .env
        pass: "",
      },
    });
  }

  async sendEmail(destinatario, assunto, texto, html = '') {
    try {
      const mailOptions = {
        from: `HelpDesk `, // Remetente
        to: destinatario,
        subject: assunto,
        text: texto,
        html: html || texto, // Se HTML não for fornecido, usa o texto
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Erro no EmailService:', error);
      throw new Error('Falha ao enviar e-mail');
    }
  }
}

module.exports = new EmailService(); // Exporta uma instância pronta
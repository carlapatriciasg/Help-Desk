const EmailService = require('../service/EmailService');

class EmailController {
  static async enviarEmail(req, res) {
    const { destinatario, assunto, texto, html } = req.body;

    try {
      const resultado = await EmailService.sendEmail(destinatario, assunto, texto, html);
      res.status(200).json({
        success: true,
        message: 'E-mail enviado!',
        info: resultado.messageId,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erro interno no servidor',
      });
    }
  }
}

module.exports = EmailController;
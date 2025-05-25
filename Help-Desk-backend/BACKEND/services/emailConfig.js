const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
  
    auth: {
        user: "", //email do remetente
        pass: "", //senha do email do remetente
    },
    
});


let options = {
    from: 'HelpDesk <>',
    to:'podlegends1807@gmail.com',
    subject: 'meu primiero email com o nodemailer',            
    text: 'boa noite',
    html: '',               
};

const sendEmail = async () => {
    try {
        let info = await transporter.sendMail(options);
        console.log("Email enviado: !");
        process.exit();
    } catch (error) {
        console.error("Erro ao enviar email:", error);
    }
}

sendEmail();



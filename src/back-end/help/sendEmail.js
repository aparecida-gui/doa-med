import nodemailer from 'nodemailer';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

//COMPLETE: Enviar email para os beneficiarios
const sendEmail = async (addressee) => {
  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '1380f7b97d6c51',
      pass: '8974fdd648f364',
    },
  });

  // send mail with defined transport object
  let info = await transport.sendMail({
    from: addressee, // sender address
    to: 'suelen.ads.guimaraes@gmail.com', // list of receivers
    subject: 'Novo Medicamento Cadastrado para Doação', // Subject line
    text: 'teste de email',
  });

  console.log('Ment: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;

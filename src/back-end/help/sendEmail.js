import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(path.resolve('../../../.env'));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//COMPLETE: Enviar email para os beneficiarios

// const sendEmail = async (name, email) => {
//   var transport = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: '1380f7b97d6c51',
//       pass: '8974fdd648f364',
//     },
//   });

//   let info = await transport.sendMail({
//     from: email, // para quem será enviado o medicamento.
//     to: 'suelen.ads.guimaraes@gmail.com', // list of receivers
//     subject: 'Novo Medicamento Cadastrado para Doação', // titulo da mensagem
//     html: '<h1>Teste de envio de e-mail.</h1>',
//   });

//   console.log('Ment: %s', info.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// };

const sendEmail = async (name, email) => {
  const msg = {
    personalizations: [
      {
        to: [
          {
            email: email,
            name: name,
          },
        ],
        dynamic_template_data: {
          name: name,
        },
        subject: 'Um doador cadastrou um medicamento que você tem interesse.',
      },
    ],
    from: {
      email: 'suelen.ads.guimaraes@gmail.com',
      name: 'Equipe do DoaMed',
    },
    reply_to: {
      email: 'suelen.ads.guimaraes@gmail.com',
      name: 'Equipe do DoaMed',
    },
    template_id: process.env.YOUR_TEMPLATE_ID_BENEFICIARY,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail;

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// const functions = require('firebase-functions');
// const nodemailer = require('nodemailer');

// // Configuração do transporte SMTP
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//         user: 'testchatapptestchatapp@gmail.com', // Seu e-mail
//         pass: 'test-chat-app74'
//   },
// });

// // Função para enviar e-mail
// exports.sendEmail = functions.https.onCall(async (data, context) => {
//   const mailOptions = {
//     from: 'testchatapptestchatapp@gmail.com',
//     to: data.to, // Endereço do destinatário
//     subject: data.subject,
//     text: data.text, // Corpo do e-mail
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true, message: 'E-mail enviado com sucesso!' };
//   } catch (error) {
//     console.error('Erro ao enviar e-mail:', error);
//     throw new functions.https.HttpsError('internal', 'Falha ao enviar o e-mail.');
//   }
// });

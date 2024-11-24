const express = require('express');
const http = require('http');
 
const { collection, deleteDoc,addDoc, query, where, getDocs, doc, getDoc, updateDoc, setDoc, arrayUnion } = require('firebase/firestore'); // Importar Firestore
const {  db } = require('./firebase'); // Importar configuração do Firebase
const { Buffer } =  require('buffer');
const { TextDecoder } = require('text-encoding');
const cors = require('cors');
 
const app = express();
app.use(cors({
    origin: 'http://localhost:8081', // Substitua pela origem do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

const server = http.createServer(app);
const IDEA = require("idea-cipher");

// Armazenar conexões dos usuários (email -> socketId)
const userSockets = {};


 const nodemailer = require('nodemailer'); // Biblioteca para enviar e-mails
const crypto = require('crypto'); // Biblioteca para geração de códigos aleatórios
const router = express.Router();

 
app.use(express.json()); // Middleware para processar JSON no corpo das requisições

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro serviço de e-mail que você usa
    auth: {
        user: 'testchatapptestchatapp@gmail.com', // Seu e-mail
        pass: 'rymd guky chzd iike' // Sua senha (recomenda-se usar uma senha de aplicativo)
    },
    tls: {
      rejectUnauthorized: false, // Configuração de TLS
    },
    port: 465, // Porta SMTP com SSL
  });

 
// Função para adicionar documento na coleção 'codes'
const addCodeDocument = async (code, email) => {
    try {
        // Documento que será adicionado
        const newDocument = {
            code: code,
            email: email,
        };

        // Referência à coleção 'codes', onde o ID do documento será o email
        const docRef = doc(db, 'codes', email); // O ID será o email

        // Adicionando o documento com o ID personalizado
        await setDoc(docRef, newDocument);
        console.log("Documento adicionado com ID:", email);
    } catch (error) {
        console.error("Erro ao adicionar documento:", error);
    }
};
  



 
 
    




// POST para gerar e enviar código de verificação
app.post('/generate-code', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'E-mail é obrigatório' });
    }

    try {
    //     // Gera um código aleatório de 6 dígitos
        const code = crypto.randomInt(100000, 999999).toString();


 
        // Agora você pode adicionar o documento ao Firestore
        addCodeDocument(code,email);
        

        // Envia o e-mail com o código
        const mailOptions = {
            from: 'testchatapptestchatapp@gmail.com',
            to: email,
            subject: 'Seu código de verificação',
            text: `Seu código de verificação é: ${code}`
        };

        await transporter.sendMail(mailOptions);

        console.log(`Código enviado para ${email}: ${code}`);
        res.status(200).json({ message: 'Código enviado com sucesso' });
    } catch (error) {
        console.error('Erro ao gerar ou enviar o código:', error);
        res.status(500).json({ message: 'Erro ao gerar ou enviar o código' });
    }
});


 
app.post('/verificar-codigo', async (req, res) => {
    const { email, code } = req.body;

    // Validação de entrada
    if (!email || !code) {
        return res.status(400).json({ message: 'Email e código são obrigatórios.' });
    }

    try {
        // Referência à coleção "codes"
        const codesCollection = collection(db, 'codes');
        
        // Consulta para encontrar o documento com o campo "email" correspondente
        const q = query(codesCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q); // Obtém os documentos que correspondem à consulta

        // Verifica se algum documento foi encontrado
        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'Código não encontrado para este email.' });
        }

        // Itera sobre os documentos encontrados (deve haver no máximo um)
        let codeData = null;
        querySnapshot.forEach((doc) => {
            codeData = doc.data(); // Obtém os dados do primeiro documento encontrado
        });

        // Verifica se o código fornecido é igual ao armazenado no Firestore
        if (codeData.code === code) {
            // Se a verificação for bem-sucedida, você pode excluir o código (opcional)
            await deleteDoc(querySnapshot.docs[0].ref); // Exclui o primeiro documento encontrado

            return res.status(200).json({ message: 'Código verificado com sucesso!' });
        } else {
            return res.status(400).json({ message: 'Código incorreto.' });
        }
    } catch (error) {
        console.error('Erro ao verificar o código:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
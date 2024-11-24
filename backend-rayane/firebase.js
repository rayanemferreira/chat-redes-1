// Importando os módulos do Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const admin = require('firebase-admin');
 

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCa0Lx3cyzPBz9eE10DuhvcOs3F4sm2GZE",
  authDomain: "chat-app-kaua.firebaseapp.com",
  projectId: "chat-app-kaua",
  storageBucket: "chat-app-kaua.appspot.com",
  messagingSenderId: "163085396885",
  appId: "1:163085396885:android:c00d3b653f6135d216a49c",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);





// Inicializar o Firebase Admin SDK com as credenciais do serviço
const serviceAccount = require('./chat-app-kaua-firebase-adminsdk-wufke-03a33fd250.json'); // Caminho para a chave JSON do Firebase
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
 


// Inicializando o Firestore
 module.exports = {  db }; // Exporte as instâncias

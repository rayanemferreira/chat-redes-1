 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCa0Lx3cyzPBz9eE10DuhvcOs3F4sm2GZE",
  authDomain: "chat-app-kaua.firebaseapp.com",
  projectId: "chat-app-kaua",
  storageBucket: "chat-app-kaua.appspot.com",
  messagingSenderId: "163085396885",
  appId: "1:163085396885:android:c00d3b653f6135d216a49c",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

 

module.exports = { auth  }; // Exporte as instâncias
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importação para navegação
import { doc, getDoc, setDoc, updateDoc, getDocs, where, query, collection, arrayUnion } from 'firebase/firestore';
import { auth } from '../../config/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Keychain from 'react-native-keychain';
import styles from './SignInStyles';
import axios from 'axios';
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Inicializando a navegação


    

    const loginFirebase = async () => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const publicKey =  await getMyPublicKey();
            const privateKey =  await getPrivateKey();

            console.log("\n\n");
            console.log("\x1b[33m", "Login bem-sucedido:");
            console.log(user);
            console.log("\x1b[33m", "Chave Pública:")
            console.log(publicKey);
            console.log("\x1b[33m", "Chave Privada:")
            console.log(privateKey);
            console.log("\n\n");

            // Substitui a tela de autenticação pela tela "Home" e passa o usuário autenticado
            // navigation.replace('Home', { userEmail: user.email, userId: user.uid });
            const response = await axios.post('http://localhost:3000/generate-code', { email });
            console.log('response',response)
            if(response.status===200){
                navigation.replace('ConfirmCodePage', { userEmail: user.email, userPassword: user.password });
            }
        }
        catch(error) {
            console.warn("Falha no login:", error);

            
            // Exibe um alerta com a mensagem de erro
            Alert.alert(
                "Atenção", // Título do alerta
                "E-mail ou senha inválidos", // Mensagem do alerta
                [{ text: "OK" }] // Botão do alerta
            );
        };
    };    

    const getMyPublicKey = async () => {
         
    };

    const getPrivateKey = async () => {
        try {
            const userId = auth.currentUser.uid; 
            const credentials = await Keychain.getGenericPassword({
                service: `privateKey_${userId}`, // Adicione o serviço aqui
            });
            if (credentials) {
                return credentials.password; // Retorna a chave privada
            } else {
                console.log('Nenhuma chave privada encontrada.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao recuperar a chave privada:', error);
        }
    };

    return (
        <ScrollView style={styles.signInContainer}>
            <Text style={styles.signInHeadTittle}> LOGIN </Text>

            <View style={styles.signInUserInfoContainer}>
                <View style={styles.signInUserInfo}>
                    <Text style={styles.signInUserInfoTittle}>Email</Text>
                    <TextInput 
                        style={styles.signInUserInfoInput} 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                    />

                    <Text style={styles.signInUserInfoTittle}>Senha</Text>
                    <TextInput 
                        style={styles.signInUserInfoInput} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry 
                    />

                    <TouchableOpacity onPress={loginFirebase}>
                        <Text style={styles.signInUserLoginButton}>Entrar</Text>
                    </TouchableOpacity>                
                </View>
            </View>

            <View style={styles.signInSingUpButtonContainer}>
                <TouchableOpacity 
                    style={styles.signInSingUpButton} 
                    onPress={() => navigation.navigate('SignUp')} // Navegação para a tela de SignUp
                >
                    <Text style={styles.signInSingUpButtonTittle}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignIn;

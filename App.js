import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import io from 'socket.io-client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, multiFactor, EmailAuthProvider } from "firebase/auth";

// Importação dos componentes
import SignUp from './components/authentication/SignUp';
import SignIn from './components/authentication/SignIn';
import Home from './components/home/Home';
import ConfirmCodePage from './components/home/ConfirmCodePage';

import Chat from './components/chat/Chat';
import ChatGroup from './components/chat/ChatGroup';
import CreateContact from './components/home/create-add/CreateContact';
import CreateGroup from './components/home/create-add/CreateGroup';
import AddContacts from './components/home/create-add/AddContacts';
import MyUser from './components/home/user/MyUser';
import Contacts from './components/home/Contacts';
import EditContact from './components/chat/delete-edit/EditContact';
import EditGroup from './components/chat/delete-edit/EditGroup';
import AddEditContacts from './components/chat/delete-edit/AddEditContacts';
import ConfirmationMessage from './components/layout/ConfirmationMessage';

const Stack = createStackNavigator();
const socket = io('http://localhost:3000'); // URL do seu servidor

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        iniciarSocket(user.email); // Conectar ao socket
       } else {
        setAuthUser(null);
        socket.disconnect();
      }
    });

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        socket.disconnect();
      }
      if (nextAppState === 'active' && authUser) {
        iniciarSocket(authUser.email);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      unsubscribe();
      socket.disconnect();
      subscription.remove();
    };
  }, [authUser]);

  const iniciarSocket = (email) => {
    socket.connect();
    socket.emit('register', email);
  };
 
   


 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">

      

      <Stack.Screen name="ConfirmCodePage" component={ConfirmCodePage} options={{ headerShown: false, animationEnabled: false }} />

        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="CreateContact" component={CreateContact} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="Contacts" component={Contacts} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="AddContacts" component={AddContacts} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="MyUser" component={MyUser} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ChatGroup" component={ChatGroup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="EditContact" component={EditContact} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="EditGroup" component={EditGroup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="AddEditContacts" component={AddEditContacts} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ConfirmationMessage" component={ConfirmationMessage} options={{ headerShown: false, animationEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

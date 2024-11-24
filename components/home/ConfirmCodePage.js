import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Importação para navegação

const ConfirmCodePage = ( { route } ) => {
  const { userEmail, userPassword, userId } = route.params;

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Inicializando a navegação

  const handleVerifyCode = async () => {
    if (!code) {
      Alert.alert('Erro', 'Por favor, insira o código de verificação.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/verificar-codigo', { email:userEmail, code });
      
      if(response.status===200){
         navigation.replace('Home', { userEmail: userEmail, userId: userId});
 
      }
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Ocorreu um erro ao verificar o código.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código de verificação"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verificar</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ConfirmCodePage;

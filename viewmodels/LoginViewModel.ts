import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert } from 'react-native';
import { RootStackParamList } from '../interfaces/topic';
import { loginUser } from '../repository/UserRepository';

export const useLoginViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const user = await loginUser(emailOrPhone, password);

      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.replace('Home'); 
      } else {
        Alert.alert('Erro', 'Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao tentar fazer o login. Tente novamente.');
    }
  };

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    handleLogin,
  };
};
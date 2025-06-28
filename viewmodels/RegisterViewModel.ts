import { useState } from 'react';
import { Alert } from 'react-native';
import { UserModel } from '../models/userModel';
import { registerUser } from '../repository/UserRepository';

export const useRegisterViewModel = (navigation: any) => {
  const [user, setUser] = useState<UserModel>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    birthDate: '',
  });

  const handleChange = (key: keyof UserModel, value: string) => {
    if (key === 'birthDate') {
      value = formatDate(value);
    }
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  const handleRegister = async () => {
    try {
      await registerUser(user);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('LoginForm');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar');
    }
  };

  return { user, handleChange, handleRegister };
};
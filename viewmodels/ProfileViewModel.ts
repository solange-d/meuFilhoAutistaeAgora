import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RootStackParamList } from '../interfaces/topic';
import { UserModel } from '../models/userModel';
import {
    deleteUser,
    getUserById,
    updateUser,
} from '../repository/UserRepository';

export const useProfileViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.id) {
          const fullUser = await getUserById(parsedUser.id);
          setUser(fullUser);
        }
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const handleUpdate = async () => {
    if (user) {
      try {
        await updateUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack();
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Erro ao atualizar o perfil');
      }
    }
  };

  const handleDelete = async () => {
    if (user && user.id) {
      try {
        await deleteUser(user.id);
        await AsyncStorage.removeItem('user');
        Alert.alert('Sucesso', 'Conta deletada com sucesso!');
        navigation.replace('Login');
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Erro ao deletar a conta');
      }
    }
  };

  const handleChange = (key: keyof UserModel, value: string) => {
    if (user) {
      setUser({ ...user, [key]: value });
    }
  };

  return { user, isLoading, handleChange, handleUpdate, handleDelete };
};
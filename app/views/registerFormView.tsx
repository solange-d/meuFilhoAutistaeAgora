import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import imgPrincipal from '../../assets/images/img-principal.png';

import { registerUser } from '../../viewmodels/authViewModel';
import { UserModel } from '../../models/userModel';

const RegisterForm = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = async () => {
    const newUser: UserModel = {
      fullName,
      email,
      phone,
      password,
      birthDate,
    };

    try {
      await registerUser(newUser);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('LoginForm');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar');
    }
  };

  const formatDate = (text: string) => {
  // Remove tudo que não é número
  const cleaned = text.replace(/\D/g, '');
  let formatted = '';

  if (cleaned.length <= 2) {
    formatted = cleaned;
  } else if (cleaned.length <= 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }

  setBirthDate(formatted);
};


  return (
    <View style={styles.container}>
      {/* Cabeçalho com título e botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor={Colors.textSecondary}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor={Colors.textSecondary}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        placeholderTextColor={Colors.textSecondary}
        value={birthDate}
        onChangeText={formatDate}
        keyboardType="numeric"
      />

      {/* Botão de Cadastrar */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para tela de login */}
      <View style={styles.loginLinkContainer}>
        <Text>Já possui login?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={styles.loginLink}> Entre aqui</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé com imagem */}
      <View style={styles.footer}>
        <Image source={imgPrincipal} style={styles.footerImage} resizeMode="contain" />
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 30,
  },
  registerButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  footerImage: {
    width: 100,
    height: 100,
  },
});

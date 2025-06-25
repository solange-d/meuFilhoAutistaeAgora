import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgPrincipal from '../../assets/image/img-principal.png';
import { Colors } from '../../constants/Colors';

const LoginForm = ({ navigation }: any) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('BottomTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Entrar</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Campo de Email ou Telefone */}
      <TextInput
        style={styles.input}
        placeholder="Email ou telefone"
        placeholderTextColor={Colors.textSecondary}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Link de Esqueceu a Senha */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Esqueceu a sua senha?</Text>
      </TouchableOpacity>

      {/* Botão de Entrar */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.centralText}>ou faça login com</Text>

      {/* Ícones de Login Social */}
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="finger-print" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Link de Não possui cadastro */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterForm')}>
          <Text style={styles.registerLink}>Cadastra-se</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé com Imagem */}
      <View style={styles.footer}>
        <Image source={imgPrincipal} style={styles.footerImage} resizeMode="contain" />
      </View>
    </View>
  );
};

export default LoginForm;

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
  forgotPasswordText: {
    textAlign: 'right',
    marginBottom: 24,
  },
  centralText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 24,
  },
  loginButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  socialButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 2,
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

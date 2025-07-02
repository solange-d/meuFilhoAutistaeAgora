import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imgPrincipal from '../../assets/images/img-principal.png';
import { Colors } from '../../constants/Colors';

const LoginView = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <Image source={imgPrincipal} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Meu Filho é Autista, e Agora?</Text>
      <Text style={styles.description}>
        Bem-vindo! Estamos aqui para te apoiar nessa nova jornada. Faça login ou crie sua conta para acessar informações, direitos e a rede de apoio.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginForm')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('RegisterForm')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
});

export default LoginView;

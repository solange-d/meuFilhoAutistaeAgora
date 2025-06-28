import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgPrincipal from '../../assets/images/img-principal.png';
import { Colors } from '../../constants/Colors';
import { useRegisterViewModel } from '../../viewmodels/RegisterViewModel';

const RegisterForm = ({ navigation }: any) => {
  const { user, handleChange, handleRegister } = useRegisterViewModel(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar</Text>
        <View style={{ width: 24 }} />
      </View>

      <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor={Colors.textSecondary} value={user.fullName} onChangeText={text => handleChange('fullName', text)} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.textSecondary} value={user.email} onChangeText={text => handleChange('email', text)} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={Colors.textSecondary} value={user.phone} onChangeText={text => handleChange('phone', text)} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={Colors.textSecondary} value={user.password} onChangeText={text => handleChange('password', text)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Data de nascimento (DD/MM/AAAA)" placeholderTextColor={Colors.textSecondary} value={user.birthDate} onChangeText={text => handleChange('birthDate', text)} keyboardType="numeric" />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <Text>Já possui login?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={styles.loginLink}> Entre aqui</Text>
        </TouchableOpacity>
      </View>

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
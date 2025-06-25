import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

const ChangePassword = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarSenhas = () => {
    if (!novaSenha || !confirmarSenha) {
      setErro('Por favor, preencha ambos os campos.');
      return false;
    }
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return false;
    }
    setErro('');
    return true;
  };

  const handleAtualizarSenha = () => {
    if (validarSenhas()) {
      // Lógica para atualizar a senha
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
      setNovaSenha('');
      setConfirmarSenha('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        placeholderTextColor={Colors.textSecondary}
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor={Colors.textSecondary}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

      <TouchableOpacity
        style={[
          styles.botaoAtualizar,
          !(novaSenha && confirmarSenha && novaSenha === confirmarSenha) && styles.botaoDesativado,
        ]}
        onPress={handleAtualizarSenha}
        disabled={!(novaSenha && confirmarSenha && novaSenha === confirmarSenha)}
      >
        <Text style={styles.textoBotao}>Atualizar Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: Colors.primary,
    backgroundColor: Colors.backgroundSecondary,
  },
  erroTexto: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  botaoAtualizar: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesativado: {
    backgroundColor: Colors.border,
  },
  textoBotao: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

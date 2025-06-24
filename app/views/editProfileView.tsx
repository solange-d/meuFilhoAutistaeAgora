import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Colors } from '../../constants/Colors';
import imgUsuario from '../../assets/images/img-usuario.png';

const EditProfile = () => {
  const [avatar, setAvatar] = useState<{ uri: string } | null>(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSelectImage = () => {
  launchImageLibrary(
    {
      mediaType: 'photo',
      quality: 0.5,
    },
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        if (selectedAsset.uri) {
          setAvatar({ uri: selectedAsset.uri });
        }
      }
    }
  );
};


  const handleUpdateProfile = () => {
    // Lógica para atualizar o perfil
    console.log('Perfil atualizado');
  };

  // Função para extrair o primeiro nome
  const getFirstName = () => {
    return fullName.trim().split(' ')[0] || '';
  };

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={avatar ? avatar : imgUsuario}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleSelectImage}>
          <Icon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Exibição do primeiro nome */}
      {fullName.trim() !== '' && (
        <Text style={styles.firstName}>{getFirstName()}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor={Colors.textSecondary}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        placeholderTextColor={Colors.textSecondary}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={Colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        placeholderTextColor={Colors.textSecondary}
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,  
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 5,
  },
  firstName: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
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
    backgroundColor: Colors.backgroundSecondary
  },
  updateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 30,
  },
  updateButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfile;

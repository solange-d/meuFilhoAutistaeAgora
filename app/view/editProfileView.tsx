import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImageSourcePropType } from 'react-native';


const EditProfile = () => {
  const [avatar, setAvatar] = useState<ImageSourcePropType>(require('../../assets/image/img-usuario.png'));
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
        console.log('Seleção de imagem cancelada pelo usuário');
      } else if (response.errorCode) {
        console.log('Erro ao selecionar imagem: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        if (selectedAsset.uri) {
          setAvatar({ uri: selectedAsset.uri });
        } else {
          console.log('URI da imagem não está disponível');
        }
      } else {
        console.log('Nenhuma imagem selecionada');
      }
    }
  );
};

  const handleUpdateProfile = () => {
    // Lógica para atualizar o perfil
    console.log('Perfil atualizado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={avatar ? avatar : require('../../assets/image/img-usuario.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleSelectImage}>
          <Icon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
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
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 15,
  },
});

export default EditProfile;

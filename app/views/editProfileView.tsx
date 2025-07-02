import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import imgUsuario from '../../assets/images/img-usuario.png';
import { Colors } from '../../constants/Colors';
import { useProfileViewModel } from '../../viewmodels/ProfileViewModel';


const EditProfile = () => {
  const { user, isLoading, handleChange, handleUpdate } = useProfileViewModel();
  const [avatar, setAvatar] = useState<{ uri: string } | null>(null);

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

  const getFirstName = () => {
    return user?.fullName?.trim().split(' ')[0] || '';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

      <Text style={styles.firstName}>{getFirstName()}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={user?.fullName || ''}
        onChangeText={(text) => handleChange('fullName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        value={user?.phone || ''}
        onChangeText={(text) => handleChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={user?.email || ''}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        value={user?.birthDate || ''}
        onChangeText={(text) => handleChange('birthDate', text)}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
  },
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
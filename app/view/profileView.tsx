import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgUsuario from '../../assets/image/img-usuario.png';
import { Colors } from '../../constants/colors';

const ProfileView = ({ navigation }: any) => {
  const userName = 'Fulano'; // Substitua por nome real do usuário

  const menuItems = [
    { label: 'Editar Perfil', icon: 'pencil-outline', screen: 'EditProfile' },
    { label: 'Configurações', icon: 'settings-outline', screen: 'SettingsView' },
    { label: 'Políticas de Privacidade', icon: 'lock-closed-outline', screen: 'PrivacyPolicy' },
    { label: 'Sair', icon: 'exit-outline', action: () => navigation.replace('Login') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Image source={imgUsuario} style={styles.avatar} />
      <Text style={styles.userName}>{userName}</Text>

      <View style={styles.menu}>
        {menuItems.map(({ label, icon, screen, action }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => (action ? action() : navigation.navigate(screen))}
          >
            <View style={styles.iconCircle}>
              <Icon name={icon} size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>{label}</Text>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,  
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 30,
  },
  menu: {
    width: '100%',
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
});

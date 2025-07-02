import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { useProfileViewModel } from '../../viewmodels/ProfileViewModel';

const SettingsView = ({ navigation }: any) => {
  const { handleDelete } = useProfileViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {
      label: 'Configuração de Notificações',
      icon: 'notifications-outline',
      screen: 'ConfiguracaoNotificacoes',
    },
    { label: 'Atualizar Senha', icon: 'key-outline', screen: 'ChangePassword' },
    {
      label: 'Deletar Conta',
      icon: 'trash-outline',
      action: () => setModalVisible(true),
    },
  ];

  const handleDeleteAccount = () => {
    setModalVisible(false);
    handleDelete(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalText}>
              Tem certeza de que deseja excluir sua conta?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default SettingsView;

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.border,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

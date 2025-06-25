import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const NotificationsView = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Mock inicial — substitua por dados reais se quiser
    setNotifications([
      'Novo documento disponível para download.',
      'Sua carteirinha venceu.',
      'Atualização no app disponível na loja.',
    ]);
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.notificationItem}>
      <Icon name="notifications" size={20} color={Colors.primary} style={{ marginRight: 10 }} />
      <Text style={styles.notificationText}>{item}</Text>
    </View>
  );

  const handleClearNotifications = () => {
    Alert.alert(
      'Limpar notificações',
      'Tem certeza que deseja remover todas as notificações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notificações</Text>

      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não possui notificações.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      )}

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearNotifications}>
          <Text style={styles.buttonText}>Limpar Notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  notificationText: {
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 100,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 12,
  },
 
  buttonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

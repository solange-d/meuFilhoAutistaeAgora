import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgPrincipal from '../../assets/image/img-principal.png';
import imgUsuario from '../../assets/image/img-usuario.png';
import { Colors } from '../../constants/colors';

const HomeView = ({ navigation }: any) => {
  const [greeting, setGreeting] = useState('');
  const userName = 'Fulano'; // Substituir pelo nome do usuário obtido do perfil

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(' Bom dia');
    else if (hour < 18) setGreeting(' Boa tarde');
    else setGreeting(' Boa noite');
  }, []);

  // Data de vencimento do documento (exemplo: 30 de maio de 2025)
  const dueDate = new Date('2025-05-30T00:00:00');
  const currentDate = new Date();
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={imgUsuario} style={styles.avatar} />
          <Text style={styles.greeting}>
            Olá, {greeting}
            {'\n'}
          <Text style={styles.userName}>{userName}</Text>
        </Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
            <Icon name="notifications-outline" size={24} color={Colors.primary} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsView')}>
            <Icon name="settings-outline" size={24} color={Colors.primary} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card de Contagem Regressiva */}
      <View style={styles.card}>
  <View style={styles.daysContainer}>
    <Text style={styles.daysNumber}>{daysUntilDue}</Text>
    <Text style={styles.daysLabel}>{daysUntilDue === 1 ? 'dia' : 'dias'}</Text>
  </View>
  <Text style={styles.cardDescription}>
    Faltantes para o vencimento da carteirinha de identificação.
  </Text>
  <TouchableOpacity
    style={styles.cardButton}
    onPress={() => navigation.navigate('Documentos')}
  >
    <Text style={styles.cardButtonText}>Acessar Documentos</Text>
  </TouchableOpacity>
</View>


  {/* Botões Estilo Card */}
  <View style={styles.buttonGrid}>
    <TouchableOpacity style={styles.cardButtonItem} onPress={() => navigation.navigate('Informações e Orientações')}>
      <Text style={styles.cardButtonItemText}>Informações e Orientações</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cardButtonItem} onPress={() => navigation.navigate('Direitos e Benefícios')}>
      <Text style={styles.cardButtonItemText}>Direitos e Benefícios</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cardButtonItem} onPress={() => navigation.navigate('Documentos')}>
      <Text style={styles.cardButtonItemText}>Documentos</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cardButtonItem} onPress={() => navigation.navigate('SuportNetwork')}>
      <Text style={styles.cardButtonItemText}>Rede de Apoio</Text>
    </TouchableOpacity>
  </View>


      {/* Mini Logo do App */}
      <View style={styles.footer}>
        <Image source={imgPrincipal} style={styles.footerImage} resizeMode="contain" />
      </View>
    </ScrollView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginLeft: 10,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    elevation: 3,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  daysNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginRight: 4,
  },
  daysLabel: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: Colors.textPrimary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cardButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardButtonItem: {
    width: 160,
    height: 80,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonItemText: {
    textAlign: 'center',
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  footerImage: {
    width: 80,
    height: 80,
  },
});

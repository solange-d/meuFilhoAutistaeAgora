import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imgPrincipal from '../../assets/images/img-principal.png';
import imgUsuario from '../../assets/images/img-usuario.png';
import { Colors } from '../../constants/Colors';
import { UserModel } from '../../models/userModel';
import { fetchDocumentsForUser } from '../../repository/DocumentRepository';

interface Document {
  id: number;
  name: string;
  dueDate: string;
  notes: string;
}

const HomeView = ({ navigation }: any) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [greeting, setGreeting] = useState('');
  
  const [nextDueDate, setNextDueDate] = useState<Date | null>(null);
  const [nextDueDocumentName, setNextDueDocumentName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadUpcomingDueDate = async () => {
        const userString = await AsyncStorage.getItem('user');
        if (!userString) return;

        const currentUser = JSON.parse(userString);
        const documents = (await fetchDocumentsForUser(currentUser.id)) as Document[];
        
        let closestDate: Date | null = null;
        let closestDocName: string | null = null;
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        documents.forEach(doc => {
          if (doc.dueDate) {
            const cleanedDate = doc.dueDate.replace(/\D/g, '');
            if (cleanedDate.length === 8) {
              const day = parseInt(cleanedDate.substring(0, 2), 10);
              const month = parseInt(cleanedDate.substring(2, 4), 10);
              const year = parseInt(cleanedDate.substring(4, 8), 10);
              
              const date = new Date(year, month - 1, day);

              if (!isNaN(date.getTime()) && date >= now) {
                if (!closestDate || date < closestDate) {
                  closestDate = date;
                  closestDocName = doc.name; 
                }
              }
            }
          }
        });
        setNextDueDate(closestDate);
        setNextDueDocumentName(closestDocName); 
      };

      loadUpcomingDueDate();
    }, [])
  );

  const renderDocumentStatus = () => {
    if (!nextDueDate || !nextDueDocumentName) {
      return (
        <Text style={styles.cardDescription}>
          Nenhum documento com vencimento próximo.
        </Text>
      );
    }
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const timeDiff = nextDueDate.getTime() - currentDate.getTime();
    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <>
        <View style={styles.daysContainer}>
          <Text style={styles.daysNumber}>{daysUntilDue}</Text>
          <Text style={styles.daysLabel}>
            {daysUntilDue === 1 ? 'dia' : 'dias'}
          </Text>
        </View>
        
        <Text style={styles.cardDescription}>
          Para o vencimento de: 
          <Text style={{ fontWeight: 'bold' }}> {nextDueDocumentName}</Text>
        </Text>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={imgUsuario} style={styles.avatar} />
          <Text style={styles.greeting}>
            Olá, {greeting}
            {'\n'}
            <Text style={styles.userName}>{user?.fullName || ''}</Text>
          </Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Icon
              name="notifications-outline"
              size={24}
              color={Colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsView')}>
            <Icon
              name="settings-outline"
              size={24}
              color={Colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.card}>
        {renderDocumentStatus()}
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate('Documents')}
        >
          <Text style={styles.cardButtonText}>Acessar Documentos</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.cardButtonItem}
          onPress={() => navigation.navigate('informationAndGuildeLiness')}
        >
          <Text style={styles.cardButtonItemText}>Informações e Orientações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButtonItem}
          onPress={() => navigation.navigate('RightsBenefits')}
        >
          <Text style={styles.cardButtonItemText}>Direitos e Benefícios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButtonItem}
          onPress={() => navigation.navigate('Documents')}
        >
          <Text style={styles.cardButtonItemText}>Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButtonItem}
          onPress={() => navigation.navigate('SuportNetwork')}
        >
          <Text style={styles.cardButtonItemText}>Rede de Apoio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image source={imgPrincipal} style={styles.footerImage} resizeMode="contain" />
      </View>
    </ScrollView>
  );
};

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
    width: '48%',
    aspectRatio: 2 / 1,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 15,
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
    marginTop: 40,
    marginBottom: 30,
  },
  footerImage: {
    width: 80,
    height: 80,
  },
});

export default HomeView;
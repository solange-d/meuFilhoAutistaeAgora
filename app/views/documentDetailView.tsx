import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../interfaces/topic';

type DocumentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'DocumentDetail'
>;

const DocumentDetailView = () => {
    const route = useRoute<DocumentDetailScreenRouteProp>();
    const { documentId } = route.params;
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalhes do Documento</Text>
        <Text style={styles.text}>ID do Documento: {documentId}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.background,
      justifyContent: 'center', 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 20,
      textAlign: 'center',
    },
    text: {
      fontSize: 18,
      color: Colors.textPrimary,
      textAlign: 'center',
    },
  });
  
  export default DocumentDetailView;
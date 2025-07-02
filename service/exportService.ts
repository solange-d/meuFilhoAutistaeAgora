import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { fetchDocumentsForUser } from '../repository/DocumentRepository';

interface Document {
  id: number;
  name: string;
  dueDate: string;
  notes: string;
}

const convertToCSV = (documents: Document[]): string => {
  const header = 'Nome do Documento ,Data de Vencimento ,Observacoes\n';
  const rows = documents
    .map(doc => `"${doc.name}","${doc.dueDate}","${doc.notes.replace(/"/g, '""')}"`)
    .join('\n');
  return header + rows;
};

export const exportDocumentsAsCSV = async (userId: number) => {
  const documents = (await fetchDocumentsForUser(userId)) as Document[];
  if (documents.length === 0) {
    throw new Error('Nenhum documento para exportar.');
  }

  const csvString = convertToCSV(documents);

  const fileUri = FileSystem.documentDirectory + 'documentos.csv';
  await FileSystem.writeAsStringAsync(fileUri, csvString, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (!(await Sharing.isAvailableAsync())) {
    throw new Error('O compartilhamento não está disponível neste dispositivo.');
  }

  await Sharing.shareAsync(fileUri, {
    mimeType: 'text/csv',
    dialogTitle: 'Compartilhar meus documentos',
  });
};
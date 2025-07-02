import {
  deleteDocument,
  getDocumentById,
  getDocumentsByUserId,
  insertDocument,
  updateDocument,
} from '../service/databaseService';

export const fetchDocumentsForUser = async (userId: number) => {
  return await getDocumentsByUserId(userId);
};

export const addDocument = async (doc: { userId: number; name: string; dueDate: string; notes: string; }) => {
  if (!doc.name.trim()) {
    throw new Error('O nome do documento é obrigatório.');
  }
  await insertDocument(doc);
};

export const fetchDocumentDetailsById = async (id: number) => {
  const result = await getDocumentById(id);
  return result;
};

export const updateDocumentRepo = async (doc: { id: number; name: string; dueDate: string; notes: string; }) => {
  if (!doc.name || !doc.name.trim()) {
    throw new Error('O nome do documento é obrigatório.');
  }
  await updateDocument(doc);
};

export const deleteDocumentRepo = async (id: number) => {
  await deleteDocument(id);
};
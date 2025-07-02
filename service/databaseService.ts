import * as SQLite from 'expo-sqlite';
import { UserModel } from '../models/userModel';

let dbInstance: SQLite.SQLiteDatabase | null = null;

const initDB = async () => {
  if (dbInstance) return dbInstance;

  const db = await SQLite.openDatabaseAsync('app.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      birthDate TEXT
    );
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      name TEXT NOT NULL,
      dueDate TEXT,
      notes TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
  dbInstance = db;
  return dbInstance;
};

export const getDbConnection = async () => {
  return dbInstance ?? (await initDB());
};

export const insertUser = async (user: UserModel) => {
  const db = await getDbConnection();
  try {
    await db.runAsync(
      `INSERT INTO users (fullName, email, phone, password, birthDate) VALUES (?, ?, ?, ?, ?)`,
      [user.fullName, user.email, user.phone, user.password, user.birthDate]
    );
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw new Error('Este e-mail ou telefone já está em uso.');
    }
    throw error;
  }
};

export const getUserByEmailOrPhoneAndPassword = async (
  emailOrPhone: string,
  password: string
): Promise<UserModel | null> => {
  const db = await getDbConnection();
  const result = await db.getFirstAsync<UserModel>(
    `SELECT * FROM users WHERE (email = ? OR phone = ?) AND password = ?`,
    [emailOrPhone, emailOrPhone, password]
  );
  return result ?? null;
};

export const insertDocument = async (doc: { userId: number; name: string; dueDate: string; notes: string; }) => {
  const db = await getDbConnection();
  await db.runAsync(
    `INSERT INTO documents (userId, name, dueDate, notes) VALUES (?, ?, ?, ?)`,
    [doc.userId, doc.name, doc.dueDate, doc.notes]
  );
};

export const getDocumentsByUserId = async (userId: number) => {
  const db = await getDbConnection();
  const results = await db.getAllAsync('SELECT * FROM documents WHERE userId = ?', [userId]);
  return results;
};

export const getDocumentById = async (id: number) => {
  const db = await getDbConnection();
  const result = await db.getFirstAsync('SELECT * FROM documents WHERE id = ?', [id]);
  return result;
};

export const updateDocument = async (doc: { id: number; name: string; dueDate: string; notes: string; }) => {
  const db = await getDbConnection();
  await db.runAsync(
    `UPDATE documents SET name = ?, dueDate = ?, notes = ? WHERE id = ?`,
    [doc.name, doc.dueDate, doc.notes, doc.id]
  );
};

export const deleteDocument = async (id: number) => {
  const db = await getDbConnection();
  await db.runAsync(`DELETE FROM documents WHERE id = ?`, [id]);
};
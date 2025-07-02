import * as SQLite from 'expo-sqlite';
import { UserModel } from '../models/userModel';

export const getDbConnection = async () => {
  return await SQLite.openDatabaseAsync('app.db');
};

export const initDB = async () => {
  const db = await getDbConnection();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      birthDate TEXT
    );
  `);
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
  const result = await db.getFirstAsync(
    `SELECT * FROM users WHERE (email = ? OR phone = ?) AND password = ?`,
    [emailOrPhone, emailOrPhone, password]
  );
  return result ? (result as UserModel) : null;
};

export const getUserById = async (id: number): Promise<UserModel | null> => {
  const db = await getDbConnection();
  const result = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]);
  return result ? (result as UserModel) : null;
};

export const updateUser = async (user: UserModel) => {
  const db = await getDbConnection();
  await db.runAsync(
    'UPDATE users SET fullName = ?, email = ?, phone = ?, birthDate = ? WHERE id = ?',
    [user.fullName, user.email, user.phone, user.birthDate, user.id]
  );
};

export const deleteUser = async (id: number) => {
  const db = await getDbConnection();
  await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
};
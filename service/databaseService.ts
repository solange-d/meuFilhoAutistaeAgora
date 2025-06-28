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
  await db.runAsync(
    `INSERT INTO users (fullName, email, phone, password, birthDate) VALUES (?, ?, ?, ?, ?)`,
    [user.fullName, user.email, user.phone, user.password, user.birthDate]
  );
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
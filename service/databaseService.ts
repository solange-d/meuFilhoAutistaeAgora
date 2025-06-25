import * as SQLite from 'expo-sqlite';
import { UserModel } from '../models/userModel';

const db = SQLite.openDatabaseSync('app.db');

export const initDB = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      birthDate TEXT
    );`
  );
};

export const insertUser = async (user: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
}) => {
  await db.runAsync(
    `INSERT INTO users (fullName, email, phone, password, birthDate) VALUES (?, ?, ?, ?, ?)`,
    [user.fullName, user.email, user.phone, user.password, user.birthDate]
  );
};

export const getUserByEmailOrPhoneAndPassword = async (
  emailOrPhone: string,
  password: string
): Promise<UserModel | null> => {
  const result = await db.getFirstAsync(
    `SELECT * FROM users WHERE (email = ? OR phone = ?) AND password = ?`,
    [emailOrPhone, emailOrPhone, password]
  );
  if (result) {
    return result as UserModel;
  }
  return null;
};

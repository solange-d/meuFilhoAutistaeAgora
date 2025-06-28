import { getDbConnection } from '../data/database';
import { UserModel } from '../models/userModel';

export const initUserTable = () => {
  const db = getDbConnection();
 // @ts-ignore
db.transaction(tx => {
  // @ts-ignore
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT,
        email TEXT,
        phone TEXT,
        password TEXT,
        birthDate TEXT
      );`
    );
  });
};

export const insertUser = (user: UserModel): Promise<void> => {
  const db = getDbConnection();
  return new Promise((resolve, reject) => {
    // @ts-ignore
    db.transaction(tx => {
        // @ts-ignore
      tx.executeSql(
        `INSERT INTO users (fullName, email, phone, password, birthDate) VALUES (?, ?, ?, ?, ?);`,
        [user.fullName, user.email, user.phone, user.password, user.birthDate],
        () => resolve(),
        // @ts-ignore
        (_, error) => {
            // @ts-ignore
          reject(error);
          return false;
        }
      );
    });
  });
};
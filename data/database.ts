import * as SQLite from 'expo-sqlite';

export const getDbConnection = async () => {
  return await SQLite.openDatabaseAsync('app.db');
};
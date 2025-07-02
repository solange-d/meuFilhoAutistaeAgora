import { UserModel, isUserValid } from '../models/userModel';
import {
  getUserByEmailOrPhoneAndPassword,
  insertUser,
} from '../service/databaseService';

export const registerUserRepo = async (user: UserModel) => {
  if (!isUserValid(user)) {
    throw new Error('Dados de usuário inválidos!');
  }
  await insertUser(user);
};

export const loginUserRepo = async (
  emailOrPhone: string,
  password: string
): Promise<UserModel | null> => {
  return await getUserByEmailOrPhoneAndPassword(emailOrPhone, password);
};
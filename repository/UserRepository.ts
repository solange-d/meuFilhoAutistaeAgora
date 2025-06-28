import { UserModel, isUserValid } from '../models/userModel';
import { getUserByEmailOrPhoneAndPassword, insertUser } from '../service/databaseService';

export const registerUser = async (user: UserModel) => {
  if (!isUserValid(user)) {
    throw new Error('Dados inválidos!');
  }
  await insertUser(user);
};

export const loginUser = async (
  emailOrPhone: string,
  password: string
): Promise<UserModel | null> => {
  return await getUserByEmailOrPhoneAndPassword(emailOrPhone, password);
};
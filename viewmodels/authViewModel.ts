import { insertUser, getUserByEmailOrPhoneAndPassword } from '../service/databaseService';
import { UserModel, isUserValid } from '../models/userModel';

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
  const user = await getUserByEmailOrPhoneAndPassword(emailOrPhone, password);
  return user || null;
};

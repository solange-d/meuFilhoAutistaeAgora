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

/*export const updateUser = async (user: UserModel) => {
  if (!user.id) {
    throw new Error('ID do usuário é necessário para atualização.');
  }
  await updateUserInDb(user);
};

export const deleteUser = async (id: number) => {
  await deleteUserFromDb(id);
};

export const getUserById = async (id: number): Promise<UserModel | null> => {
  return await getUserFromDb(id);
};*/
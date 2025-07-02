export interface UserModel {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
}

export const isUserValid = (user: UserModel): boolean => {
  const nameValid = user.fullName.trim().length >= 3;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
  const phoneValid = /^\d{8,15}$/.test(user.phone);
  const passwordValid = user.password.length >= 4;
  const birthDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(user.birthDate);
  return nameValid && emailValid && phoneValid && passwordValid && birthDateValid;
};
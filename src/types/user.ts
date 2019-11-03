export interface IUserInfo {
  id: number; // uid
  name: string; // nick name
  avatar: string; // avatar
  mail: string; // e-mail
  age: number; // age
  birth: string; // birthday
  gender: number; // sex
}

export interface IUserRegisterInfo {
  name?: string;
  account: string;
  password: string;
  avatar: string;
}

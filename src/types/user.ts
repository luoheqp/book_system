export interface IUserInfo {
  id: number; // uid
  name: string; // nick name
  avatar: string; // avatar
  mail: string; // e-mail
  age: number; // age
  birth: string; // birthday
  gender: number; // sex
}

export interface IUserSignUpInfo {
  name?: string;
  account: string;
  password: string;
  avatar: Blob;
}

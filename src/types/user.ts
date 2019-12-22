export interface IUserInfo {
  account: string;
  avatar: string;
  likeTag: string;
  likeBook: number;
  article: string;
  readBook: number;
  readSet: Object;
  collectBook: Object[];
  uploadBook: Object[];
}

export interface IUserSignUpInfo {
  name?: string;
  account: string;
  password: string;
  avatar: Blob;
}

export interface IUserSignInInfo {
  account: string;
  password: string;
}

export interface IUserChangeInfo {
  avatar?: Blob;
  password?: string;
}

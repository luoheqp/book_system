import { IReaderSet } from "./book";

export interface IUserInfo {
  account: string;
  avatar: string;
  likeTag: string;
  likeBook: number;
  article: string;
  readBook: number;
  readSet: IReaderSet;
  collectBook: Object[];
  uploadBook: Object[];
}

export interface IUserSignUpInfo {
  name?: string;
  account: string;
  password: string;
  avatar: Blob | string;
}

export interface IUserSignInInfo {
  account: string;
  password: string;
}

export interface IUserChangeInfo {
  avatar?: Blob;
  password?: string;
}

export interface IUserChangeCollection {
  bookId: string;
  type: 0 | 1; // 0 - 去除; 1 - 添加
}

export interface IUserCollect {
  _id: string;
  author: string;
  cover: string;
  data: string;
  name: string;
  percent: number;
}

export interface IUserChangeLike {
  bookId: string;
  type: 0 | 1;
}

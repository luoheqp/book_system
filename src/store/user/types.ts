interface IRequestData {
  code: number;
  msg: string;
}

export interface IUserSignUpSuccess extends IRequestData {
  token: string;
}

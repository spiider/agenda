/// <reference types="react-scripts" />

interface IUser {
  username: string;
  password: string;
}

interface ICreateUser extends IUser {
  name: string;
}

interface IEvent {
  title: string;
  desc: string;
  end: string;
  start: string;
}

interface IToken {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: string;
}

interface IFullUser {
  user: IUser;
  token: IToken;
}

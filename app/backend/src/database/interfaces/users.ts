interface IToken {
  data: {
    id: number;
    role: string;
  }
}

interface IUser {
  user: {
    id: number;
    username: string;
    role: string;
    email?: string,
    password?: string,
  },
  token: string
}

export {
  IToken,
  IUser,
};

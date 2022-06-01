import users from '../models/users';
import { IUser } from '../interfaces/users';
import { jwtSign, jwtVerify } from '../helpers/generateToken';
import crypto from '../helpers/passwordCrypt';

class LoginService {
  constructor(private models = users) {}

  login = async (email: string, password: string): Promise<IUser | null> => {
    const user = await users.findOne({ where: { email } });
    if (!user) return null;

    const teste = crypto(password, user.password);
    if (!teste) return null;

    const token = jwtSign({ data: { role: user.role, id: user.id } });

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
  };

  validateLogin = async (token: string): Promise<string | null> => {
    if (!token) return null;

    const dataToken = jwtVerify(token);
    console.log(dataToken);

    const user = await users.findOne({ where: { id: dataToken.data.id } });
    if (!user) return null;

    const userLogin = user.role;

    return userLogin;
  };
}
export default new LoginService();

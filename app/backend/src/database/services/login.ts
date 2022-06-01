import users from '../models/users';
import { IUser } from '../interfaces/users';
import { jwtSign } from '../helpers/generateToken';
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
}
export default new LoginService();

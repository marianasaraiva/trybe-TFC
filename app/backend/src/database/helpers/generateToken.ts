import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IToken } from '../interfaces/users';

const generateToken = (payload: IToken): string => {
  const jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const privateKEY = fs.readFileSync('jwt.evaluation.key', 'utf8');

  const token = jwt.sign(payload, privateKEY, jwtConfig);

  return token;
};

export default generateToken;

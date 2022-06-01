import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IToken } from '../interfaces/users';

const PRIVATEKEY = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export const jwtSign = (payload: IToken): string => jwt.sign(payload, PRIVATEKEY, jwtConfig);

export const jwtVerify = (token: string) => jwt.verify(token, PRIVATEKEY) as IToken;

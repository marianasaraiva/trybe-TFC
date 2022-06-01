import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const validateToken = async (token: string) => {
  const privateKEY = fs.readFileSync('jwt.evaluation.key', 'utf8');

  const decoded = jwt.verify(token, privateKEY);
  return decoded;
};

export default validateToken;

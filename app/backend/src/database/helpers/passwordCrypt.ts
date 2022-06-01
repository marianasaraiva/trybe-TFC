import * as bcrypt from 'bcryptjs';

const crypto = (pass: string, hash: string): boolean => {
  const response = bcrypt.compareSync(pass, hash);
  return response;
};

export default crypto;

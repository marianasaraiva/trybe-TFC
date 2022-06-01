import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const isValidLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);

  if (error) throw error;

  next();
};

export default isValidLogin;

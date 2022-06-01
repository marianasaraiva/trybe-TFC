import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .empty()
    .required(),
  password: Joi.string()
    .min(6)
    .empty()
    .required(),
});

const isValidLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;

  next();
};

export default isValidLogin;

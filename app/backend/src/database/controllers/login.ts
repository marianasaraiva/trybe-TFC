import { Request, Response, NextFunction } from 'express';
import loginService from '../services/login';

class LoginController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const response = await loginService.login(email, password);

      if (!response) return res.status(401).json({ message: 'Incorrect email or password' });

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      const response = await loginService.validateLogin(authorization as string);

      if (!response) return res.status(401).json({ message: 'Invalid Token' });

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new LoginController();

import { Request, Response, NextFunction } from 'express';
import loginService from '../services/login';

class LoginController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const response = await loginService.login(email, password);

      if (!response) {
        console.log(401);
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      console.log(200);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new LoginController();

import * as express from 'express';

import loginController from '../controllers/login';
import isValidLogin from '../middlewares/login';

const loginRouter = express.Router();

loginRouter.post('/', isValidLogin, loginController.login);

export default loginRouter;

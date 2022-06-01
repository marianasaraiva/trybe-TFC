import * as express from 'express';

import loginRouter from './login';
import teamRouter from './teams';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);

export default router;

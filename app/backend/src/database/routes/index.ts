import * as express from 'express';

import loginRouter from './login';
import teamRouter from './teams';
import matchRouter from './matches';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;

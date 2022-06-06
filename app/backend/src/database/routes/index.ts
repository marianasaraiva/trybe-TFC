import * as express from 'express';

import loginRouter from './login';
import teamRouter from './teams';
import matchRouter from './matches';
import leaderboardsRouter from './leaderboards';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardsRouter);

export default router;

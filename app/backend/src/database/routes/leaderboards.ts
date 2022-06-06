import * as express from 'express';

import leaderboardsController from '../controllers/leaderboardsHome';
import leaderboardsAwayController from '../controllers/leaderboardsAway';

const leaderboardsRouter = express.Router();

leaderboardsRouter.get('/home', leaderboardsController.getAll);
leaderboardsRouter.get('/away', leaderboardsAwayController.getAll);

export default leaderboardsRouter;

import * as express from 'express';

import TeamControllers from '../controllers/teams';

const teamRouter = express.Router();

teamRouter.get('/', TeamControllers.getAllTeams);
teamRouter.get('/:id', TeamControllers.getByIdTeam);

export default teamRouter;

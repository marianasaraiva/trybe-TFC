import * as express from 'express';

import matchersController from '../controllers/matches';

const matchRouter = express.Router();

matchRouter.get('/', matchersController.getByQuery);

export default matchRouter;

import * as express from 'express';

import matchersController from '../controllers/matches';

const matchRouter = express.Router();

matchRouter.get('/', matchersController.getByQuery);
matchRouter.post('/', matchersController.createMatch);
matchRouter.patch('/:id/finish', matchersController.patchMatch);

export default matchRouter;

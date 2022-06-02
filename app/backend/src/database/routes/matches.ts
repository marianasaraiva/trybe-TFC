import * as express from 'express';

import matchersController from '../controllers/matches';

const matchRouter = express.Router();

matchRouter.patch('/:id/finish', matchersController.patchMatch);
matchRouter.patch('/:id', matchersController.patchIdMatch);
matchRouter.get('/', matchersController.getByQuery);
matchRouter.post('/', matchersController.createMatch);

export default matchRouter;

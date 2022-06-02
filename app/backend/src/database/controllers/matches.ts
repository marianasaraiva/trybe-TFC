import { Request, Response, NextFunction } from 'express';
import MatchServices from '../services/matches';

class MatchControllers {
  getByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      const changeBoolean = inProgress === 'true';
      const result = inProgress ? changeBoolean : undefined;
      const games = await MatchServices.getByQuery(result);

      return res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  };

  createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const newGame = await MatchServices.createMatch(req.body, authorization as string);
      return res.status(201).json(newGame);
    } catch (error) {
      next(error);
    }
  };

  patchMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const findByPk = await MatchServices.patchMatch(Number(id));
      if (!findByPk) {
        return res.status(404)
          .json({ message: 'ERROR' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default new MatchControllers();

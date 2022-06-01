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
}

export default new MatchControllers();

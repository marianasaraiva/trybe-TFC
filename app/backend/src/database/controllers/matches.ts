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

      if (!newGame) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      if (newGame === true) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

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

  patchIdMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const findByPk = await MatchServices
        .patchIdMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
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

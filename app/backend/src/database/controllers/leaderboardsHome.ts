import { Request, Response, NextFunction } from 'express';
import LeaderboardsServices from '../services/leaderboadsHome';

class LeaderboardControllers {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await LeaderboardsServices.boardHome();

      return res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };
}

export default new LeaderboardControllers();

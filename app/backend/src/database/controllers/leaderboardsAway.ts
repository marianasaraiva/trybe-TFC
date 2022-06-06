import { Request, Response, NextFunction } from 'express';
import LeaderboardAwayServices from '../services/leaderboadsAway';

class LeaderBoardAwayControllers {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await LeaderboardAwayServices.boardAway();

      return res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };
}

export default new LeaderBoardAwayControllers();

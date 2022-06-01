import { Request, Response, NextFunction } from 'express';
import TeamServices from '../services/teams';

class TeamControllers {
  getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await TeamServices.getAllTeams();

      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getByIdTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const team = await TeamServices.getByIdTeam(Number(req.params.id));

      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default new TeamControllers();

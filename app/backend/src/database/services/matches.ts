import matches from '../models/matches';
import Teams from '../models/teams';
import { ICreateMatch, IMatch } from '../interfaces/matchers';
import LoginService from './login';

class MatchServices {
  constructor(private models = matches) {}

  async getAllMatches(): Promise<IMatch[]> {
    const game = await this.models.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return game;
  }

  async getByQuery(inProgress: boolean | undefined): Promise<IMatch[]> {
    if (inProgress === undefined) {
      const verify = await this.getAllMatches();
      return verify;
    }

    const game = await this.models.findAll({
      where: { inProgress },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        }, {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        }],
    });
    return game;
  }

  async createMatch(createUser: ICreateMatch, token: string): Promise<ICreateMatch | null> {
    const verify = await LoginService.validateLogin(token);

    if (!verify) return null;

    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = createUser;
    const newGame = await this.models
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });
    return newGame;
  }

  async patchMatch(id: number): Promise<boolean> {
    const patchByPk = await this.models.findByPk(id);
    if (!patchByPk) return false;

    await this.models.update({ inProgress: false }, { where: { id } });
    return true;
  }
}

export default new MatchServices();

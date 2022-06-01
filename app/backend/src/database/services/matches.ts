import matches from '../models/matches';
import Teams from '../models/teams';
import IMatch from '../interfaces/matchers';

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
}

export default new MatchServices();

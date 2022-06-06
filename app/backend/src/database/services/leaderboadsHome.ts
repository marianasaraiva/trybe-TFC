import sortArray = require('sort-array');
import Matches from '../models/matches';
import Teams from '../models/teams';

class LeaderboadsServices {
  constructor(
    private modelsMatches = Matches,
    private modelsTeams = Teams,
  ) {}

  static totalVictories = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);

  static totalLosses = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);

  static totalDraws = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);

  static totalPoints = (matches: Matches[]) => {
    const victories = this.totalVictories(matches) * 3;
    const draws = this.totalDraws(matches);
    return victories + draws;
  };

  static goalsFavor = (matches: Matches[]) => matches
    .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

  static goalsOwn = (matches: Matches[]) => matches
    .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

  static goalsBalance = (matches: Matches[]) => {
    const goalsFavor = this.goalsFavor(matches);
    const goalsOwn = this.goalsOwn(matches);
    return goalsFavor - goalsOwn;
  };

  static leaderboads(matches: Matches[]) {
    return {
      totalPoints: this.totalPoints(matches),
      totalGames: matches.length,
      totalVictories: this.totalVictories(matches),
      totalDraws: this.totalDraws(matches),
      totalLosses: this.totalLosses(matches),
      goalsFavor: this.goalsFavor(matches),
      goalsOwn: this.goalsOwn(matches),
      goalsBalance: this.goalsBalance(matches),
      efficiency: +((this.totalPoints(matches) / (matches.length * 3)) * 100).toFixed(2),
    };
  }

  boardHome = async () => {
    const getAllTeams = await this.modelsTeams.findAll();
    const result = getAllTeams.map(async (e) => {
      const matches = await this.modelsMatches
        .findAll({ where: { homeTeam: e.id, inProgress: false } });
      const board = LeaderboadsServices.leaderboads(matches);
      return {
        name: e.teamName,
        ...board,
      };
    });
    const finishboard = await Promise.all(result);
    const keysOrder = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const order = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(finishboard, { by: keysOrder, order });
  };
}

export default new LeaderboadsServices();

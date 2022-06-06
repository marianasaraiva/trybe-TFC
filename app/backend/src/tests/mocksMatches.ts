import { ICreateMatch } from "../database/interfaces/matchers";

class MocksMatches {
  public matches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo'
      },
      teamAway: {
        teamName: 'Grêmio'
      }
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: {
        teamName: 'Internacional'
      },
      teamAway: {
        teamName: 'Santos'
      }
    },
  ]

  public matchesCreated = [{
    id: 50,
    homeTeam: 15,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true
  }];
  
  public matchesPost = {
    homeTeam: 15,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  } 

  public matchesPoints: {
    homeTeamGoals: 10,
    awayTeamGoals: 1
  }

  // public boardHome: [
  //   {
  //     name: 'Santos',
  //     totalPoints: 9,
  //     totalGames: 3,
  //     totalVictories: 3,
  //     totalDraws: 0,
  //     totalLosses: 0,
  //     goalsFavor: 9,
  //     goalsOwn: 3,
  //     goalsBalance: 6,
  //     efficiency: 100
  //   },
  //   {
  //     name: 'Palmeiras',
  //     totalPoints: 7,
  //     totalGames: 3,
  //     totalVictories: 2,
  //     totalDraws: 1,
  //     totalLosses: 0,
  //     goalsFavor: 10,
  //     goalsOwn: 5,
  //     goalsBalance: 5,
  //     efficiency: 77.78
  //   },
  //   {
  //     name: 'Corinthians',
  //     totalPoints: 6,
  //     totalGames: 2,
  //     totalVictories: 2,
  //     totalDraws: 0,
  //     totalLosses: 0,
  //     goalsFavor: 6,
  //     goalsOwn: 1,
  //     goalsBalance: 5,
  //     efficiency: 100
  //   }
  // ]
}

export default new MocksMatches();


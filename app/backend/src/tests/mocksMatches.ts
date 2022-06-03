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
      home_team: 16,
      away_team: 8,
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
      home_team: 9,
      away_team: 14,
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
}

export default new MocksMatches();


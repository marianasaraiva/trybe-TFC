import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import mocks from './mocksLogin';
import mocksTeams from './mocksTeams';
import mocksMatches from './mocksMatches';

import { Response } from 'superagent';

import users from '../database/models/users';
import teams from '../database/models/teams';
import matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rotas de Login', () => {
  let chaiHttpResponse: Response;

  describe('Quando há uma requisição POST para /login', () => {
    describe('Requisição retorna com sucesso', async() => {
      before(async () => {
        sinon
          .stub(users, "findOne")
          .resolves(mocks.userModel[0] as users);
          
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(mocks.login)
        })
        
        after(() => {
          (users.findOne as sinon.SinonStub).restore();
        })
        
        const { user, token } = chaiHttpResponse.body;

      it('Verifica retorno do status 200', async() => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno do token', async() => {
        expect(token).not.to.be.undefined;
      });
    });

    describe('Requisição retorna sem sucesso', async () => {
      before(async () => {
        sinon
          .stub(users, "findOne")
          .resolves(null);
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(mocks.login)
      })

      after(() => {
        (users.findOne as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 401', () => {
        expect(chaiHttpResponse).to.have.status(401);
      });

      it('Verifica mensagem de erro', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
      });
    });
  });

  describe('Quando há uma requisição GET para /login/validate', () => {
    describe('Requisição retorna com sucesso', async() => {
      before(async () => {
        sinon
          .stub(users, "findOne")
          .resolves(mocks.userModel[0] as users);
          
          chaiHttpResponse = await chai
          .request(app)
          .post('/login/validate')
          .send(mocks.login)
        })
        
        after(() => {
          (users.findOne as sinon.SinonStub).restore();
        })
        
        const { user, token } = chaiHttpResponse.body;

      it('Verifica retorno do status 200', async() => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno do token', async() => {
        expect(token).not.to.be.undefined;
      });

      it('Verifica retorno do usuário do token', async() => {
        expect(user.role).to.be.equal('admin');
      });
    });

    describe('Requisição retorna sem sucesso', async () => {
      before(async () => {
        sinon
          .stub(users, "findOne")
          .resolves(null);
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
      })

      after(() => {
        (users.findOne as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 401', () => {
        expect(chaiHttpResponse).to.have.status(401);
      });

      it('Verifica retorno com token inválido', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid Token' });
      });
    });
  });
});

describe('Testando rotas de Teams', () => {
  let chaiHttpResponse: Response;

  describe('Quando há uma requisição GET para /teams', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(teams, "findAll")
          .resolves(mocksTeams.teams as teams[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams')
      })

      after(() => {
        (teams.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno do array de times', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksTeams.teams as teams[]);
      });
    });
  });

  describe('Quando há uma requisição GET para /teams/:id', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(teams, "findOne")
          .resolves(mocksTeams.teams[0] as teams);
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/1')
      })

      after(() => {
        (teams.findOne as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno de um time de acordo com o id selecionado', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksTeams.teams[0] as teams);
      });
    });
  });
});

describe('Testando rotas de Matches', () => {
  let chaiHttpResponse: Response;

  describe('Quando há uma requisição GET para /matches', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findAll")
          .resolves(mocksMatches.matches as unknown as matches[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
      })

      after(() => {
        (matches.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno de todas as partidas, finalizadas e em andamento', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksMatches.matches as unknown as matches[]);
      });
    });
  });

  describe('Quando há uma requisição GET para /matches?inProgress=true', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findAll")
          .resolves(mocksMatches.matches as unknown as matches[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true')
      })

      after(() => {
        (matches.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno das partidas em andamento', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksMatches.matches as unknown as matches[]);
      });
    });
  });

  describe('Quando há uma requisição GET para /matches?inProgress=false', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findAll")
          .resolves(mocksMatches.matches[0] as unknown as matches[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false')
      })

      after(() => {
        (matches.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno das partidas finalizadas', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksMatches.matches[0] as unknown as matches[]);
      });
    });
  });

  describe('Quando há uma requisição POST para /matches', () => {
    describe('Requisição retorna com sucesso', async () => {

      let tokenLoginResponse: Response;

      before(async () => {
        sinon
          .stub(teams, "findOne")
          .onCall(0)
          .resolves(mocksTeams.teams[0] as teams)
          .onCall(1)
          .resolves(mocksTeams.teams[1] as teams)
        sinon
          .stub(matches, "create")
          .resolves(mocksMatches.matchesCreated[0] as matches)
        
        tokenLoginResponse = await chai
        .request(app)
        .post('/login')
        .send(mocks.login)

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', tokenLoginResponse.body.token)
          .send(mocksMatches.matchesPost)
      })

      after(() => {
        (teams.findOne as sinon.SinonStub).restore();
        (matches.create as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 201', () => {
        expect(chaiHttpResponse).to.have.status(201);
      });

      it('Verifica retorno da partida criada', () => {
        expect(chaiHttpResponse.body).to.deep.equal(mocksMatches.matchesCreated[0] as matches);
      });
    });

    describe('Requisição retorna sem sucesso case "null"', async () => {
      let tokenLoginResponse: Response;
      
      before(async () => {
        sinon
          .stub(teams, "findOne")
          .resolves()
        sinon
          .stub(matches, "create")
          .resolves(mocksMatches.matchesCreated[0] as matches)
        
        tokenLoginResponse = await chai
        .request(app)
        .post('/login')
        .send(mocks.login)

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', tokenLoginResponse.body.token)
          .send(mocksMatches.matchesPost)
      })

      after(() => {
        (matches.create as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 401', () => {
        expect(chaiHttpResponse).not.to.have.status(401);
      });

      it('Verifica mensagem de erro', () => {
        expect(chaiHttpResponse.body).not.to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      });
    });
  });

  describe('Quando há uma requisição PATCH para /matches/:id', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findByPk")
          .resolves(mocksMatches.matchesCreated[0] as matches);
        sinon
          .stub(matches, "update")
          .resolves()
   
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send(mocksMatches.matchesPoints)
      })

      after(() => {
        (matches.findByPk as sinon.SinonStub).restore();
        (matches.update as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno da partida criada', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
      });
    });

    describe('Requisição retorna sem sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findByPk")
          .resolves(null);

        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send(mocksMatches.matchesPoints)
      })

      after(() => {
        (matches.findByPk as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 404', () => {
        expect(chaiHttpResponse).to.have.status(404);
      });

      it('Verifica a partida existe para ser atualizada', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: "ERROR" });
      });
    });
  });

  describe('Quando há uma requisição PATCH para /matches/:id/finish', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findByPk")
          .resolves(mocksMatches.matchesCreated[0] as matches);
        sinon
          .stub(matches, "update")
          .resolves()
   
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
          .send(mocksMatches.matchesPoints)
      })

      after(() => {
        (matches.findByPk as sinon.SinonStub).restore();
        (matches.update as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('Verifica retorno da partida criada', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
      });
    });

    describe('Requisição retorna sem sucesso', async () => {
      before(async () => {
        sinon
          .stub(matches, "findByPk")
          .resolves(null);

        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
          .send(mocksMatches.matchesPoints)
      })

      after(() => {
        (matches.findByPk as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 404', () => {
        expect(chaiHttpResponse).to.have.status(404);
      });

      it('Verifica a partida existe para ser atualizada', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ message: "ERROR" });
      });
    });
  });
});

describe('Testando rotas de Leaderboard', () => {
  let chaiHttpResponse: Response;

  describe('Quando há uma requisição GET para /leaderboard/home', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(teams, "findAll")
          .resolves(mocksTeams.teams as teams[]);
        sinon
          .stub(matches, 'findAll')
          .resolves(mocksMatches.matches as unknown as matches[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/leaderboard/home')
      })

      after(() => {
        (teams.findAll as sinon.SinonStub).restore();
        (matches.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      // it('Verifica retorno do array de times', () => {
      //   expect(chaiHttpResponse.body).to.deep.equal(mocksMatches.boardHome);
      // });
    });
  });

  describe('Quando há uma requisição GET para /leaderboard/away', () => {
    describe('Requisição retorna com sucesso', async () => {
      before(async () => {
        sinon
          .stub(teams, "findAll")
          .resolves(mocksTeams.teams as teams[]);
        sinon
          .stub(matches, 'findAll')
          .resolves(mocksMatches.matches as unknown as matches[]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/leaderboard/away')
      })

      after(() => {
        (teams.findAll as sinon.SinonStub).restore();
        (matches.findAll as sinon.SinonStub).restore();
      })

      it('Verifica retorno do status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
    });
  });
});

import * as express from 'express';
import * as cors from 'cors';
import router from './database/routes';
import errorHandler from './database/middlewares/error';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.cors();
    this.router();
    this.error();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private router(): void {
    this.app.use(router);
  }

  private error(): void {
    this.app.use(errorHandler);
  }

  private cors(): void {
    this.app.use(cors());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Ouvindo na ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

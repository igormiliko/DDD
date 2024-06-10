import { Application, Router, json, urlencoded } from 'express';
import getLocalIp from './utils/getLocalIp';
import modules from './modules';
import serverConfig from './config/server.config';
import cors from 'cors';
import helmet from 'helmet';
import nocache from 'nocache';
import serverMiddleware from './middlewares/server.middleware';
import * as dotenv from 'dotenv';
dotenv.config();

class Server {
  private router = Router();

  constructor(
    private app: Application,
    public port: number = 3333,
  ) {}

  private printerStart() {
    process.stdout.write('\x1Bc');
    console.log(serverConfig.asciiArt);
    console.log(serverConfig.runningOn(getLocalIp(), this.port));
  }

  private addMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(nocache());
    this.app.use(json({ limit: '100mb' }));
    this.app.use(urlencoded({ extended: true }));
  }

  private async addModules() {
    this.app.use(modules(this.router));
  }

  public async turnOn() {
    this.addMiddlewares();
    await this.addModules();
    this.app.use(serverMiddleware.finalWare);
    this.app.use(serverMiddleware.notFound);
    return this.app.listen(this.port, () => this.printerStart());
  }
}

export default Server;

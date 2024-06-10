import { Router } from 'express';
import path from 'path';
import AbstractRoute from './abstract.route';

class AbstractModule {
  constructor(
    public entityName: string,
    protected router: Router,
    protected routes: {
      new (entityName: string, router: Router): AbstractRoute;
    },
    protected dir: string,
  ) {}

  private controllerPath = path.join(
    path.join(this.dir, 'core'),
    `${this.entityName}.controller.ts`,
  );

  private bindController = (routes: any, controller: any) => {
    for (const routeName in routes) {
      routes[routeName](controller[routeName]);
    }
  };

  private initRoutes() {
    const { routes } = new this.routes(this.entityName, this.router);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let controller = require(this.controllerPath).default;

    controller = new controller();

    this.bindController(routes, controller);
  }

  build() {
    this.initRoutes();
  }
}

export default AbstractModule;

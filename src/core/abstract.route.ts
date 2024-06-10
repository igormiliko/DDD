import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';

class AbstractRoute {
  constructor(
    public entityName: string,
    protected router: Router,
  ) {}

  public routes = {
    index: (controller: any) =>
      this.router.get(`/${this.entityName}`, controller),

    indexOne: (controller: any) =>
      this.router.get(
        `/${this.entityName}/:id`,
        validationMiddleware.paramIdNumber,
        controller,
      ),

    create: (controller: any) =>
      this.router.post(`/${this.entityName}`, controller),

    update: (controller: any) =>
      this.router.put(
        `/${this.entityName}/:id`,
        validationMiddleware.paramIdNumber,
        controller,
      ),

    delete: (controller: any) =>
      this.router.delete(
        `/${this.entityName}/:id`,
        validationMiddleware.paramIdNumber,
        controller,
      ),
  };

  //   public routes = {};
  //   public config = {};

  //   private _config = {
  //     index: {
  //       route: `${this.entityName}`,
  //       method: 'get',
  //     },
  //     indexOne: {
  //       route: `${this.entityName}/:id`,
  //       method: 'get',
  //     },
  //     create: {
  //       route: `${this.entityName}`,
  //       method: 'post',
  //     },
  //     update: {
  //       route: `${this.entityName}/:id`,
  //       method: 'put',
  //     },
  //     delete: {
  //       route: `${this.entityName}/:id`,
  //       method: 'delete',
  //     },
  //     ...this.config,
  //   };

  //   public registerRoute(router: Router) {
  //     for (const key in this._config) {
  //       const { route, method } = this._config[key];
  //       this.routes[key] = (controller: any) =>
  //         router[method](route, controller(this.entityName));
  //     }
  //     return this.routes;
  //   }
}

export default AbstractRoute;

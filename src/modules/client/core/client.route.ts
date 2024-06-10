import { Router } from 'express';
import AbstractRoute from '../../../core/abstract.route';

class ClientRoute extends AbstractRoute {
  constructor(entityName: string, router: Router) {
    super(entityName, router);
  }
}

export default ClientRoute;

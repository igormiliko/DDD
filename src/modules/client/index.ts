import { Router } from 'express';
import ClientRoute from './core/client.route';
import AbstractModule from '../../core/abstract.module';

class ClientModule extends AbstractModule {
  constructor(
    public entityName: string,
    protected router: Router,
  ) {
    super(entityName, router, ClientRoute, __dirname);
  }
}

export default ClientModule;

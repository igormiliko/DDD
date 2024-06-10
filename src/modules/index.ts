import { Router } from 'express';
import fs from 'fs';
import path from 'path';

class Modules {
  constructor(private router: Router) {}

  private buildModules() {
    fs.readdirSync(__dirname).forEach((moduleName) => {
      if (!moduleName.includes('.ts')) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const module = require(path.join(__dirname, moduleName)).default;
        new module(moduleName, this.router).build();
      }
    });
  }

  init() {
    this.buildModules();
    return this.router;
  }
}

export default (router: Router) => new Modules(router).init();

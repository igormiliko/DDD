import { Request, Response, NextFunction } from 'express';

abstract class AbstractController {
  abstract index(req: Request, res: Response, next: NextFunction): void;
  abstract indexOne(req: Request, res: Response, next: NextFunction): void;
  abstract create(req: Request, res: Response, next: NextFunction): void;
  abstract update(req: Request, res: Response, next: NextFunction): void;
  abstract delete(req: Request, res: Response, next: NextFunction): void;
}

export default AbstractController;

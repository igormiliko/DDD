import Validate from '../utils/Validate';
import { NextFunction, Request, Response } from 'express';

class ValidationMiddleware {
  paramIdNumber(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!Validate.number(id)) {
      return next({
        status: 400,
        message: 'Bad request',
      });
    }
    return next();
  }
}

export default new ValidationMiddleware();

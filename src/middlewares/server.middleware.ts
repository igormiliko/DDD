import { NextFunction, Request, Response } from 'express';
import {
  HttpBadRequestResponse,
  HttpNotFoundResponse,
  HttpServerErrorResponse,
} from '../utils/response';

export type TNextData = {
  status: number;
  message: string;
  error: boolean;
  data?: any;
  detail?: string;
};

class ServerMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  finalWare(response: TNextData, _: Request, res: Response, __: NextFunction) {
    try {
      console.log(response);
      if (response.detail) {
        response = HttpBadRequestResponse(response.detail);
      }

      res.status(response.status).json(response).send();
    } catch (error) {
      res.status(500).json(HttpServerErrorResponse).send();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notFound(_: Request, res: Response, __: NextFunction) {
    res.status(404).json(HttpNotFoundResponse).send();
  }
}

export default new ServerMiddleware();

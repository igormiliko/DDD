import UserModel from './client.model';
import userService from './client.service';
import { NextFunction, Request, Response } from 'express';
import AbstractController from '../../../core/abstract.controlle';
import {
  HttpCreatedResponse,
  HttpNoContentResponse,
  HttpQueryResponse,
  HttpUpdatedResponse,
} from '../../../utils/response';

class UserController extends AbstractController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, page } = req.query;

      let data = await userService.index({
        page: Number(page),
        limit: Number(limit),
      });

      data = await Promise.all(
        data.map(async (row) => await new UserModel(row).serialize('out')),
      );

      return next(HttpQueryResponse(data));
    } catch (error) {
      return next(error);
    }
  }

  async indexOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await userService.indexOne(Number(id));
      return next(HttpQueryResponse(data));
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await new UserModel(req.body)
        .removePropertie(['id'])
        .serialize('in');

      const [record] = await userService.insert(Object.values(data));
      data = await new UserModel(record).serialize('out');

      return next(HttpCreatedResponse(data));
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let data = await new UserModel(req.body)
        .removePropertie(['id'])
        .serialize('in');

      const [record] = await userService.update(Number(id), data);

      data = await new UserModel(record).serialize('out');

      return next(HttpUpdatedResponse(data));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userService.delete(Number(id));
      return next(HttpNoContentResponse);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async userProfiles(req, res, next) {
    console.log('asdasd');
    return next({
      status: 200,
      error: false,
      message: 'Heelo world',
    });
  }
}

export default UserController;

import AbstractService from '../../../core/abstract.service';
import { HttpNotFoundResponse } from '../../../utils/response';
import ClientModel from './client.model';
import { TClient } from './client.type';

class ClientService extends AbstractService {
  async insert(data: any[]) {
    return new Promise<TClient['in'][]>(async (resolve, reject) => {
      try {
        const connection = await this.db;
        console.log(ClientModel.insert, data);
        const { rows } = await connection.query(ClientModel.insert, data);
        return resolve(rows);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async delete(id: number) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const connection = await this.db;
        const { rowCount } = await connection.query(ClientModel.delete, [id]);

        if (rowCount === 0) {
          reject(HttpNotFoundResponse);
        }

        return resolve(rowCount);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async index(
    { page, limit }: { page: number; limit: number } = { page: 0, limit: 0 },
  ) {
    return new Promise<TClient['in'][]>(async (resolve, reject) => {
      try {
        page = isNaN(page) ? 0 : page;
        limit = isNaN(limit) ? 100 : limit;

        const connection = await this.db;
        const { rows } = await connection.query(ClientModel.index, [
          limit ?? 100,
          limit * page ?? 0,
        ]);

        return resolve(rows);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async indexOne(id: number) {
    return new Promise<TClient['in'][]>(async (resolve, reject) => {
      try {
        const connection = await this.db;
        const { rows, rowCount } = await connection.query(
          ClientModel.indexOne,
          [id],
        );

        if (rowCount === 0) {
          return reject(HttpNotFoundResponse);
        }

        return resolve(rows);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async update(id: number, data: any) {
    return new Promise<TClient['in'][]>(async (resolve, reject) => {
      try {
        const connection = await this.db;
        const { rows } = await connection.query(ClientModel.update, [
          ...data,
          id,
        ]);
        return resolve(rows);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default new ClientService();

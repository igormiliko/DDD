import Database from '../database/Database';

abstract class AbstractService {
  protected db = Database.getInstance();

  abstract insert(data: any): Promise<any>;
  abstract delete(id: number): Promise<any>;
  abstract index({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<any>;
  abstract indexOne(id: number): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
}

export default AbstractService;

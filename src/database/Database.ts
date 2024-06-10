import pg, { PoolClient } from 'pg';

class Database {
  private static instance: Database;
  private pool: pg.Pool;
  private client: PoolClient | null = null;

  private constructor() {
    this.pool = new pg.Pool({
      user: process.env.USER_DATABASE,
      host: process.env.SERVER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: 5432,
      // ssl: {
      //     rejectUnauthorized: false
      // }
    });
  }

  public static async getInstance(): Promise<PoolClient> {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    if (!Database.instance.client) {
      Database.instance.client = await Database.instance.pool.connect();
    }
    return Database.instance.client;
  }

  public static async releaseInstance(): Promise<void> {
    if (Database.instance && Database.instance.client) {
      await Database.instance.client.release();
      Database.instance.client = null;
    }
  }
}

export default Database;

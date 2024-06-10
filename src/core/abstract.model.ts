import { TAnyObject, TMode, TPropertiesModel } from '../types/types';
import AbstractSerialize from './abstract.serialize';

abstract class AbstractModel<T extends TMode> {
  abstract properties;
  constructor(
    public data: TAnyObject,
    protected serializer: AbstractSerialize<T>,
  ) {}
  static insert: string | Error = new Error('Query not implemented: "insert"');
  static delete: string | Error = new Error('Query not implemented: "delete"');
  static index: string | Error = new Error('Query not implemented: "index"');
  static indexOne: string | Error = new Error(
    'Query not implemented: "indexOne"',
  );
  static update: string | Error = new Error('Query not implemented: "update"');

  removePropertie(keys: string[]) {
    if (Array.isArray(keys)) {
      this.properties = this.properties.filter(
        (prop) => !keys.includes(prop.dbKey),
      );
    }
    return this;
  }

  addPropertie(properties: TPropertiesModel[]) {
    this.properties = [...this.properties, ...properties];
  }

  async serialize(
    mode: keyof TMode,
  ): Promise<typeof mode extends 'in' ? T['in'] : T['out']> {
    return this.serializer.run({
      properties: this.properties,
      data: this.data,
      mode,
    });
  }
}

export default AbstractModel;

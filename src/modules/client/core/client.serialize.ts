import AbstractSerialize from '../../../core/abstract.serialize';
import { TClient } from './client.type';

class ClientSerialize extends AbstractSerialize<TClient> {
  constructor() {
    super();
  }
}

export default new ClientSerialize();

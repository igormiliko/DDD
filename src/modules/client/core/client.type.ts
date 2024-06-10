import { TFromTPropertiesModel } from '../../../types/types';
import ClientModel from './client.model';

type ClientTypeUsingAppKey = TFromTPropertiesModel<
  ClientModel['properties'],
  'appKey'
>;

type ClientTypeUsingDbKey = TFromTPropertiesModel<
  ClientModel['properties'],
  'dbKey'
>;

export type TClient = {
  in: ClientTypeUsingDbKey;
  out: ClientTypeUsingAppKey;
};

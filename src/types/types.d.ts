export type MapType<T> = T extends 'number'
  ? number
  : T extends 'string'
    ? string
    : T extends 'email'
      ? string
      : unknown;

export type TFromTPropertiesModel<
  PM extends any[],
  K extends 'appKey' | 'dbKey',
> = {
  [P in PM[number] as P[K]]: MapType<P['type']>;
};

export type TMode = {
  in: TFromTPropertiesModel<TPropertiesModel[], 'appKey'>;
  out: TFromTPropertiesModel<TPropertiesModel[], 'dbKey'>;
};

export type TPropertiesModel = {
  appKey: string;
  dbKey: string;
  type: string;
  required: boolean;
};

export type TAnyObject = { [key: string]: any };

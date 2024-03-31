import { ArgumentValue, FieldName, FieldValue, Resource } from '@/types';

export class DatabaseLoader {
  public static load() {}

  public static getValueFromKey(
    data: Resource,
    key: FieldName | FieldValue
  ): ArgumentValue {
    return data[key as any];
  }
}

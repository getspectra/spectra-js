import { ArgumentValue, FieldName, FieldValue } from '@getspectra/spectra-typings';
import { DataInterface } from '@/types';
import { isArgumentRef } from './expression';

/**
 * @description Get the value from the key.
 */
export function getValueFromKey(
  data: DataInterface,
  key: FieldName | FieldValue
): ArgumentValue {
  if (typeof key === 'string') {
    return data[key];
  }

  if (key !== null && isArgumentRef(key)) {
    return data[key.ref];
  }

  return key;
}

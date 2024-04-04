import { DataLoaderFunction, DataLoaderInterface } from '@/types';

/**
 * @description Check if the value is a data loader function.
 */
export function isDataLoaderFunction(value: any): value is DataLoaderFunction {
  return !!(value && value.constructor && value.call && value.apply);
}

/**
 * @description Check if the value is a data loader class.
 */
export function isDataLoaderClass(value: any): value is DataLoaderInterface {
  return typeof value === 'object' && isDataLoaderFunction(value.load);
}

import { FieldName } from '@getspectra/spectra-typings';

/**
 * @description Data type.
 */
export type DataType = Record<FieldName, any>;

/**
 * @description Data loader function.
 */
export type DataLoaderFunction = (fields: Array<FieldName>) => DataType;

/**
 * @description Interface for the data loader class.
 */
export type DataLoaderInterface = { load: DataLoaderFunction };

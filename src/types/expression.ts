import { ExpressionDefinition, FieldName } from '@getspectra/spectra-typings';
import { DataInterface } from './data-loader';

export type ExpressionInterface = {
  getOperation(): string;
  getExpression(): ExpressionDefinition;
  getFields(): Array<FieldName>;
  evaluate(data: DataInterface): boolean;
  jsonSerialize(): string;
};

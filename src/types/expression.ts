import { DataInterface } from './data-loader';
import { ExpressionDefine, FieldName } from './literal';

export type ExpressionInterface = {
  getOperation(): string;
  getExpression(): ExpressionDefine;
  getFields(): Array<FieldName>;
  evaluate(data: DataInterface): boolean;
  jsonSerialize(): string;
};

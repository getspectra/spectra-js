import { Resource } from './data-loader';
import { ExpressionDefine } from './literal';

export type ExpressionInterface = {
  getOperation(): string;
  getExpression(): ExpressionDefine;
  evaluate(data: Resource): boolean;
  jsonSerialize(): string;
};

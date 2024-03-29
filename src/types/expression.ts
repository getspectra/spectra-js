import { ExpressionDef, Resource } from './literal';

export type ExpressionInterface = {
  getOperation(): string;
  getExpression(): ExpressionDef;
  evaluate(data: Resource): boolean;
  jsonSerialize(): string;
};

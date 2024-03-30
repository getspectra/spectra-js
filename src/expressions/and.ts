import { AndExpressionDef, ExpressionInterface } from '@/types';
import { BinaryExpression } from './binary';

export class AndExpression implements ExpressionInterface {
  private expressions: Array<BinaryExpression>;

  constructor(expressions: Array<BinaryExpression>) {
    this.expressions = expressions;
  }

  public getOperation(): string {
    return 'AND';
  }

  public getExpression(): AndExpressionDef {
    return {
      and: this.expressions.map((expression) => expression.getExpression()),
    };
  }

  public evaluate(data: object): boolean {
    return this.expressions.every((expression) => expression.evaluate(data));
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }
}

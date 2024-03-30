import { ExpressionInterface, AndExpressionDefine } from '@/types';

export class AndExpression implements ExpressionInterface {
  private expressions: Array<ExpressionInterface>;

  constructor(expressions: Array<ExpressionInterface>) {
    this.expressions = expressions;
  }

  public getOperation(): string {
    return 'AND';
  }

  public getExpression(): AndExpressionDefine {
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

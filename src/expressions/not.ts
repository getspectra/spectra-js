import { ExpressionInterface, FieldName, NotExpressionDefine } from '@/types';

export class NotExpression implements ExpressionInterface {
  private expression: ExpressionInterface;

  constructor(expression: ExpressionInterface) {
    this.expression = expression;
  }

  public getOperation(): string {
    return 'NOT';
  }

  public getExpression(): NotExpressionDefine {
    return {
      not: this.expression.getExpression(),
    };
  }

  public getFields(): Array<FieldName> {
    return this.expression.getFields();
  }

  public evaluate(data: object): boolean {
    return !this.expression.evaluate(data);
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }
}

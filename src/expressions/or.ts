import { FieldName, OrExpressionDefinition } from '@getspectra/spectra-typings';
import { ExpressionInterface } from '@/types';

export class OrExpression implements ExpressionInterface {
  private expressions: Array<ExpressionInterface>;

  constructor(expressions: Array<ExpressionInterface>) {
    this.expressions = expressions;
  }

  public getOperation(): string {
    return 'OR';
  }

  public getExpression(): OrExpressionDefinition {
    return {
      or: this.expressions.map((expression) => expression.getExpression()),
    };
  }

  public getFields(): Array<FieldName> {
    return this.expressions.reduce((fields, expression) => {
      return fields.concat(expression.getFields());
    }, [] as Array<FieldName>);
  }

  public evaluate(data: object): boolean {
    return this.expressions.some((expression) => expression.evaluate(data));
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }
}

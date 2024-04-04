import { AndExpressionDefinition, FieldName } from '@getspectra/spectra-typings';
import {
  DataType,
  DebuggerOptions,
  ExpressionInterface,
  LogicExpressionDebugReport,
  LogicOperationName,
} from '@/types';

export class AndExpression implements ExpressionInterface {
  private expressions: Array<ExpressionInterface>;

  constructor(expressions: Array<ExpressionInterface>) {
    this.expressions = expressions;
  }

  public getName(): string {
    return LogicOperationName.AND;
  }

  public getFields(): Array<FieldName> {
    return this.expressions.reduce((fields, expression) => {
      return fields.concat(expression.getFields());
    }, [] as Array<FieldName>);
  }

  public getDefinition(): AndExpressionDefinition {
    return {
      and: this.expressions.map((expression) => expression.getDefinition()),
    };
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getDefinition());
  }

  public evaluate(data: DataType): boolean {
    return this.expressions.every((expression) => expression.evaluate(data));
  }

  public debug(data: DataType, options: DebuggerOptions): LogicExpressionDebugReport {
    return {
      name: this.getName(),
      value: this.evaluate(data),
      expressions: this.expressions.map((expression) => expression.debug(data, options)),
    };
  }
}

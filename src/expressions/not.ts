import { FieldName, NotExpressionDefinition } from '@getspectra/spectra-typings';
import {
  DataType,
  DebuggerOptions,
  ExpressionInterface,
  LogicExpressionDebugReport,
  LogicOperationName,
} from '@/types';

export class NotExpression implements ExpressionInterface {
  private expression: ExpressionInterface;

  constructor(expression: ExpressionInterface) {
    this.expression = expression;
  }

  public getName(): string {
    return LogicOperationName.NOT;
  }

  public getFields(): Array<FieldName> {
    return this.expression.getFields();
  }

  public getExpressons(): Array<ExpressionInterface> {
    return [this.expression];
  }

  public getDefinition(): NotExpressionDefinition {
    return {
      not: this.expression.getDefinition(),
    };
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getDefinition());
  }

  public evaluate(data: DataType): boolean {
    return !this.expression.evaluate(data);
  }

  public debug(data: DataType, options: DebuggerOptions): LogicExpressionDebugReport {
    return {
      name: this.getName(),
      value: this.evaluate(data),
      expressions: [this.expression.debug(data, options)],
    };
  }
}

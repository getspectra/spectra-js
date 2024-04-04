import {
  ExpressionDebugReport,
  ExpressionInterface,
  DebuggerOptions,
  DataType,
} from '@/types';

export class Debugger {
  public static debug(
    data: DataType,
    expression: ExpressionInterface,
    options: DebuggerOptions
  ): ExpressionDebugReport {
    return expression.debug(data, options);
  }
}

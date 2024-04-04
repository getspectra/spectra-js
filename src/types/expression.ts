import { ExpressionDefinition, FieldName } from '@getspectra/spectra-typings';
import { DebuggerOptions, ExpressionDebugReport } from './debugger';
import { DataType } from './data-loader';

export type ExpressionInterface = {
  getName(): string;
  getFields(): Array<FieldName>;
  getDefinition(): ExpressionDefinition;
  jsonSerialize(): string;
  evaluate(data: DataType): boolean;
  debug(data: DataType, options: DebuggerOptions): ExpressionDebugReport;
};

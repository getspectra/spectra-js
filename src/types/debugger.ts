import { Value, FieldName, Operation } from '@getspectra/spectra-typings';
import { PolicyInterface } from './policy';
import { DataType } from './data-loader';

export type DebuggerOptions = Partial<{
  /**
   * @description if `true`, will check ref value and field, if both are `null`, expression is `false`
   * @default false
   */
  strict: boolean;
}>;

export type SpectraDebugReport = {
  /**
   * @description The policies used in the permission.
   */
  policies: Array<PolicyDebugReport>;
  /**
   * @description The fields used in the permission.
   */
  fields: Array<FieldName>;
  /**
   * @description The data used in the policy.
   */
  data: DataType;
};

export type PolicyDebugReport = Exclude<PolicyInterface, 'filter'> & {
  /**
   * @description Whether the policy matched the permission.
   */
  matched: boolean;
  /**
   * @description Whether the policy was applied.
   */
  applied: boolean;
  /**
   * @description The fields used in the policy.
   */
  fields: Array<FieldName>;
  /**
   * @description The debug report for the filter.
   */
  filter: ExpressionDebugReport;
};

export type ExpressionDebugReport =
  | LogicExpressionDebugReport
  | BinaryExpressionDebugReport;

export type LogicExpressionDebugReport = {
  name: string;
  value: boolean;
  expressions: Array<ExpressionDebugReport>;
};

export type BinaryExpressionDebugReport = {
  name: string;
  value: boolean;
  operation: Operation;
  left: { name: FieldName; value: Value };
  right: { name: FieldName | null; value: Value };
};

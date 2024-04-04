import {
  BinaryExpressionDefinition,
  FieldName,
  FieldValue,
  Operation,
} from '@getspectra/spectra-typings';
import {
  ExpressionInterface,
  DataType,
  OperationName,
  ExpressionDebugReport,
  DebuggerOptions,
} from '@/types';
import { compareValue, getValueFromKey, isRefValue } from '@/utils';

export class BinaryExpression implements ExpressionInterface {
  private left: FieldName;
  private right: FieldValue;
  private operation: Operation;

  constructor(left: FieldName, operation: Operation, right: FieldValue) {
    this.left = left;
    this.right = right;
    this.operation = operation;
  }

  public getName(): string {
    return OperationName[this.operation];
  }

  public getFields(): Array<FieldName> {
    const fields = [this.left];

    if (isRefValue(this.right)) {
      fields.push(this.right.ref);
    }

    return fields;
  }

  public getDefinition(): BinaryExpressionDefinition {
    return [this.left, this.operation, this.right];
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getDefinition());
  }

  public getValue(data: DataType) {
    return {
      left: {
        name: this.left,
        value: getValueFromKey(data, this.left),
      },
      right: isRefValue(this.right)
        ? {
            name: this.right.ref,
            value: getValueFromKey(data, this.right.ref),
          }
        : {
            name: null,
            value: this.right,
          },
    };
  }

  public evaluate(data: DataType): boolean {
    const { left, right } = this.getValue(data);
    return compareValue(left.value, this.operation, right.value);
  }

  public debug(data: DataType, options: DebuggerOptions): ExpressionDebugReport {
    const { left, right } = this.getValue(data);

    let value: boolean;
    if (
      options.strict &&
      isRefValue(this.right) &&
      left.value === null &&
      right.value === null
    ) {
      value = false;
      console.warn(
        '[spectra] strict mode: left and right are null, expression is false.'
      );
    } else {
      value = compareValue(left.value, this.operation, right.value);
    }

    return {
      name: this.getName(),
      value,
      left,
      right,
      operation: this.operation,
    };
  }
}

import {
  BinaryExpressionDefinition,
  FieldName,
  FieldValue,
  Operation,
} from '@getspectra/spectra-typings';
import { ExpressionInterface, DataInterface } from '@/types';
import { compareValue, getValueFromKey, isArgumentRef } from '@/utils';

export class BinaryExpression implements ExpressionInterface {
  private left: FieldName;
  private right: FieldValue;
  private operation: Operation;

  constructor(left: FieldName, operation: Operation, right: FieldValue) {
    this.left = left;
    this.right = right;
    this.operation = operation;
  }

  public getOperation(): string {
    return this.operation;
  }

  public getExpression(): BinaryExpressionDefinition {
    return [this.left, this.operation, this.right];
  }

  public getFields(): Array<FieldName> {
    const fields = [this.left];

    if (isArgumentRef(this.right)) {
      fields.push(this.right.ref);
    }

    return fields;
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }

  public evaluate(data: DataInterface): boolean {
    const leftValue = getValueFromKey(data, this.left);
    const rightValue = getValueFromKey(data, this.right);
    return compareValue(leftValue, this.operation, rightValue);
  }
}

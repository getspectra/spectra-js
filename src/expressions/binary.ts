import {
  ExpressionInterface,
  BinaryExpressionDefine,
  FieldName,
  FieldValue,
  Operation,
  Resource,
} from '@/types';

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

  public getExpression(): BinaryExpressionDefine {
    return [this.left, this.operation, this.right];
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }

  public evaluate(data: Resource): boolean {
    return !!data;
  }
}

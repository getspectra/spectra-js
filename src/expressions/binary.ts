import {
  ArgumentRef,
  BinaryExpressionDef,
  ExpressionInterface,
  FieldName,
  Operation,
  Resource,
  Value,
} from '@/types';

export class BinaryExpression implements ExpressionInterface {
  private left: FieldName;
  private right: Value | ArgumentRef;
  private operation: Operation;

  constructor(left: FieldName, operation: Operation, right: Value | ArgumentRef) {
    this.left = left;
    this.right = right;
    this.operation = operation;
  }

  public getOperation(): string {
    return this.operation;
  }

  public getExpression(): BinaryExpressionDef {
    return [this.left, this.operation, this.right];
  }

  public jsonSerialize(): string {
    return JSON.stringify(this.getExpression());
  }

  public evaluate(data: Resource): boolean {
    return !!data;
  }
}

import { ArgumentRef, ExpressionInterface, FieldName, Operation, Value } from '../types';

export class BinaryExpression implements ExpressionInterface {
  private left: FieldName;
  private operation: Operation;
  private right: Value | ArgumentRef;

  constructor(left: FieldName, operation: Operation, right: Value | ArgumentRef) {
    this.left = left;
    this.right = right;
    this.operation = operation;
  }

  public serialize(expression: object): string {
    console.log(expression);
    console.log(this.left);
    console.log(this.right);
    console.log(this.operation);

    return '';
  }

  public deserialize(expression: string): object {
    console.log(expression);
    return {};
  }

  public evaluate(data: object): boolean {
    console.log(data);
    return true;
  }
}

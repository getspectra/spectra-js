import { ExpressionInterface, DataType } from '@/types';

export class Evaluator {
  public static evaluate(data: DataType, filter: ExpressionInterface): boolean {
    return filter.evaluate(data);
  }
}

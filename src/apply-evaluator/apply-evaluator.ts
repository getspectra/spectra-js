import { ExpressionInterface, DataInterface } from '@/types';

export class ApplyEvaluator {
  public static evaluate(data: DataInterface, applyFilter: ExpressionInterface): boolean {
    return applyFilter.evaluate(data);
  }
}

import { ExpressionInterface, Resource } from '@/types';

export class ApplyEvaluator {
  public static evaluate(resource: Resource, applyFilter: ExpressionInterface): boolean {
    return applyFilter.evaluate(resource);
  }
}

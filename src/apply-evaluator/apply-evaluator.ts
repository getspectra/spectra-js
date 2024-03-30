import { ExpressionInterface, Resource } from '@/types';

export class ApplyEvaluator {
  public static evaluate(resources: Resource, applyFilter: ExpressionInterface): boolean {
    return !!(resources && applyFilter);
  }
}

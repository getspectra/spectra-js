import { ExpressionInterface, Resource } from '@/types';

export class ApplyEvaluator {
  public static evaluate(resources: Resource, applyFilter: ExpressionInterface): boolean {
    console.log(resources, applyFilter);
    return true;
  }
}

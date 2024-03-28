import { ExpressionInterface, Resource } from '../types';

export class ApplyEvaluator {
  /**
   * @param loadedResources 数据
   * @param applyFilter 策略
   */
  public static evaluate(
    loadedResources: Resource,
    applyFilter: ExpressionInterface
  ): boolean {
    console.log(loadedResources, applyFilter);
    return true;
  }
}

import { Effect } from './literal';
import { ExpressionInterface } from './expression';

export type PolicyInterface = {
  description?: string;
  permissions: Array<string>;
  applyFilter: ExpressionInterface;
  effect: Effect;
};

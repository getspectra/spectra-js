import { ExpressionInterface } from './expression';

export type Effect = 'ALLOW' | 'DENY';

export type PolicyInterface = {
  description?: string;
  permissions: Array<string>;
  applyFilter: ExpressionInterface;
  effect: Effect;
};

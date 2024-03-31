import { ExpressionInterface } from './expression';

export type PolicyEffect = 'ALLOW' | 'DENY';

export type PolicyInterface = {
  description?: string;
  permissions: Array<string>;
  applyFilter: ExpressionInterface;
  effect: PolicyEffect;
};

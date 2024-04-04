import { ExpressionInterface } from './expression';

export type PolicyEffect = 'ALLOW' | 'DENY';

export type PolicyInterface = {
  description?: string;
  permissions: Array<string>;
  effect: PolicyEffect;
  filter: ExpressionInterface;
};

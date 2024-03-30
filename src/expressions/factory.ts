import { ExpressionDefine, ExpressionInterface } from '@/types';
import { normalizeExpression } from '@/utils';
import { AndExpression } from './and';
import { NotExpression } from './not';
import { OrExpression } from './or';

export function and(
  expressions: Array<ExpressionInterface | ExpressionDefine>
): AndExpression {
  const normalizedExpressions = expressions.map((expression) =>
    normalizeExpression(expression)
  );

  return new AndExpression(normalizedExpressions);
}

export function or(
  expressions: Array<ExpressionInterface | ExpressionDefine>
): OrExpression {
  const normalizedExpressions = expressions.map((expression) =>
    normalizeExpression(expression)
  );

  return new OrExpression(normalizedExpressions);
}

export function not(expression: ExpressionInterface | ExpressionDefine): NotExpression {
  const normalizedExpression = normalizeExpression(expression);

  return new NotExpression(normalizedExpression);
}

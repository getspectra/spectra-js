import { ExpressionDefinition, FieldName, FieldValue } from '@getspectra/spectra-typings';
import { ExpressionInterface, OperationEnum } from '@/types';
import { normalizeExpression } from '@/utils';
import { BinaryExpression } from './binary';
import { AndExpression } from './and';
import { NotExpression } from './not';
import { OrExpression } from './or';

export function and(
  expressions: Array<ExpressionInterface | ExpressionDefinition>
): AndExpression {
  const normalizedExpressions = expressions.map((expression) =>
    normalizeExpression(expression)
  );
  return new AndExpression(normalizedExpressions);
}

export function or(
  expressions: Array<ExpressionInterface | ExpressionDefinition>
): OrExpression {
  const normalizedExpressions = expressions.map((expression) =>
    normalizeExpression(expression)
  );
  return new OrExpression(normalizedExpressions);
}

export function not(
  expression: ExpressionInterface | ExpressionDefinition
): NotExpression {
  const normalizedExpression = normalizeExpression(expression);
  return new NotExpression(normalizedExpression);
}

export function eq(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.EQ, right);
}

export function ne(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.NEQ, right);
}

export function neq(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.NEQ, right);
}

export function gt(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.GT, right);
}

export function gte(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.GTE, right);
}

export function lt(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.LT, right);
}

export function lte(left: FieldName, right: FieldValue): BinaryExpression {
  return new BinaryExpression(left, OperationEnum.LTE, right);
}

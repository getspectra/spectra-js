import {
  BinaryExpressionDefinition,
  AndExpressionDefinition,
  OrExpressionDefinition,
  NotExpressionDefinition,
  RefValue,
  Operation,
} from '@getspectra/spectra-typings';
import {
  BinaryExpression,
  AndExpression,
  OrExpression,
  NotExpression,
} from '@/expressions';
import { ExpressionInterface, OperationEnum } from '@/types';

export function isRefValue(key: any): key is RefValue {
  return key !== null && typeof key === 'object' && 'ref' in key;
}

export function isValidOperation(operation: any): operation is Operation {
  return [
    OperationEnum.EQ,
    OperationEnum.NEQ,
    OperationEnum.NEQ2,
    OperationEnum.GT,
    OperationEnum.GTE,
    OperationEnum.LT,
    OperationEnum.LTE,
    OperationEnum.IN,
    OperationEnum.NIN,
    OperationEnum.NOT_IN,
  ].includes(operation);
}

export function isValidExpressionInterface(
  expression: any
): expression is ExpressionInterface {
  return (
    expression instanceof BinaryExpression ||
    expression instanceof AndExpression ||
    expression instanceof OrExpression ||
    expression instanceof NotExpression
  );
}

export function isValidBinaryExpressionDefinition(
  expression: any
): expression is BinaryExpressionDefinition {
  if (!Array.isArray(expression)) {
    return false;
  }

  if (expression.length !== 3) {
    return false;
  }

  const [left, operation, right] = expression;

  if (typeof left !== 'string') {
    return false;
  }

  if (!isValidOperation(operation)) {
    return false;
  }

  if (
    typeof right === 'string' ||
    typeof right === 'boolean' ||
    typeof right === 'number' ||
    right instanceof Date ||
    right === null
  ) {
    return true;
  }

  if (typeof right === 'object' && typeof right.ref === 'string') {
    return true;
  }

  return false;
}

export function isValidAndExpressionDefinition(
  expression: any
): expression is AndExpressionDefinition {
  if (typeof expression !== 'object') {
    return false;
  }

  if (!Array.isArray(expression.and)) {
    return false;
  }

  if (expression.and.length <= 1) {
    return false;
  }

  return true;
}

export function isValidOrExpressionDefinition(
  expression: any
): expression is OrExpressionDefinition {
  if (typeof expression !== 'object') {
    return false;
  }

  if (!Array.isArray(expression.or)) {
    return false;
  }

  if (expression.or.length <= 1) {
    return false;
  }

  return true;
}

export function isValidNotExpressionDefinition(
  expression: any
): expression is NotExpressionDefinition {
  return typeof expression === 'object' && expression.not !== undefined;
}

/**
 * @description Normalize an expression to an expression instance.
 */
export function normalizeExpression(expression: any): ExpressionInterface {
  if (isValidExpressionInterface(expression)) {
    return expression;
  }

  if (isValidBinaryExpressionDefinition(expression)) {
    return new BinaryExpression(expression[0], expression[1], expression[2]);
  }

  if (isValidAndExpressionDefinition(expression)) {
    return new AndExpression(expression.and.map(normalizeExpression));
  }

  if (isValidOrExpressionDefinition(expression)) {
    return new OrExpression(expression.or.map(normalizeExpression));
  }

  if (isValidNotExpressionDefinition(expression)) {
    return new NotExpression(normalizeExpression(expression.not));
  }

  throw new Error('[spectra] Invalid expression provided.', expression);
}

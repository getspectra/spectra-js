import {
  ExpressionDefinition,
  BinaryExpressionDefinition,
  AndExpressionDefinition,
  OrExpressionDefinition,
  NotExpressionDefinition,
  ArgumentRef,
} from '@getspectra/spectra-typings';
import {
  BinaryExpression,
  AndExpression,
  OrExpression,
  NotExpression,
} from '@/expressions';
import { ExpressionInterface } from '@/types';

/**
 * @description Check if the key is an ArgumentRef.
 */
export function isArgumentRef(key: any): key is ArgumentRef {
  return typeof key === 'object' && 'ref' in key && 'type' in key;
}

/**
 * @description Check if an expression is a valid expression interface.
 */
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

/**
 * @description Check if an expression is a valid binary expression definition.
 */
export function isValidBinaryExpressionDefine(
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

  if (typeof operation !== 'string') {
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

  if (
    typeof right === 'object' &&
    right.type === 'field' &&
    typeof right.ref === 'string'
  ) {
    return true;
  }

  return false;
}

/**
 * @description Check if an expression is a valid AND expression definition.
 */
export function isValidAndExpressionDefine(
  expression: any
): expression is AndExpressionDefinition {
  if (typeof expression !== 'object') {
    return false;
  }

  if (!Array.isArray(expression.and)) {
    return false;
  }

  return true;
}

/**
 * @description Check if an expression is a valid OR expression definition.
 */
export function isValidOrExpressionDefine(
  expression: any
): expression is OrExpressionDefinition {
  if (typeof expression !== 'object') {
    return false;
  }

  if (!Array.isArray(expression.or)) {
    return false;
  }

  return true;
}

/**
 * @description Check if an expression is a valid NOT expression definition.
 */
export function isValidNotExpressionDefine(
  expression: any
): expression is NotExpressionDefinition {
  return typeof expression === 'object' && expression.not !== undefined;
}

/**
 * @description Check if an expression is a valid expression definition.
 */
export function isValidExpressionDefine(
  expression: any
): expression is ExpressionDefinition {
  return (
    isValidBinaryExpressionDefine(expression) ||
    isValidAndExpressionDefine(expression) ||
    isValidOrExpressionDefine(expression) ||
    isValidNotExpressionDefine(expression)
  );
}

/**
 * @description Normalize an expression to an expression instance.
 */
export function normalizeExpression(expression: any): ExpressionInterface {
  if (isValidExpressionInterface(expression)) {
    return expression;
  }

  if (isValidBinaryExpressionDefine(expression)) {
    return new BinaryExpression(expression[0], expression[1], expression[2]);
  }

  if (isValidAndExpressionDefine(expression)) {
    return new AndExpression(expression.and.map(normalizeExpression));
  }

  if (isValidOrExpressionDefine(expression)) {
    return new OrExpression(expression.or.map(normalizeExpression));
  }

  if (isValidNotExpressionDefine(expression)) {
    return new NotExpression(normalizeExpression(expression.not));
  }

  throw new Error('[spectra] Invalid expression provided.', expression);
}

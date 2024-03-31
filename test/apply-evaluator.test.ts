import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, ApplyEvaluator } from '@/index';

describe('ApplyEvaluator', () => {
  test('evaluate', () => {
    const resource = {};
    const truthy = new BinaryExpression('user.id', '=', 1);
    const result = ApplyEvaluator.evaluate(resource, truthy);
    expect(result).toBeTruthy();

    const falsy = new BinaryExpression('user.id', '<>', 3);
    const falsyResult = ApplyEvaluator.evaluate(resource, falsy);
    expect(falsyResult).toBeFalsy();
  });
});

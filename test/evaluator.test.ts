import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, Evaluator } from '@/index';

describe('Evaluator', () => {
  test('evaluate', () => {
    const resource = {
      'user.id': 1,
      'user.create_at': Date.now(),
    };
    const truthy = new BinaryExpression('user.id', '=', 1);
    const result = Evaluator.evaluate(resource, truthy);
    expect(result).toBeTruthy();

    const falsy = new BinaryExpression('user.id', '<>', 1);
    const falsyResult = Evaluator.evaluate(resource, falsy);
    expect(falsyResult).toBeFalsy();
  });
});

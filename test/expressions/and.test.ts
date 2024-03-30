import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, AndExpression } from '@/expressions';

describe('And Expression', () => {
  test('base serialize', () => {
    const userId = new BinaryExpression('user.id', '=', 1);
    const userName = new BinaryExpression('user.name', '<>', null);
    const and = new AndExpression([userId, userName]);
    const serializedAnd = and.jsonSerialize();
    const expected = JSON.stringify({
      and: [
        ['user.id', '=', 1],
        ['user.name', '<>', null],
      ],
    });
    expect(serializedAnd).toBe(expected);
  });
});

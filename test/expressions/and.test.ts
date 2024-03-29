import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, AndExpression } from '../../src/expressions';

describe('And Expression', () => {
  test('base serialize', () => {
    const binary = new BinaryExpression('user.id', '=', 1);
    const and = new AndExpression([binary]);
    const serializedBinary = and.jsonSerialize();
    const expected = JSON.stringify({ and: [['user.id', '=', 1]] });
    expect(serializedBinary).toBe(expected);
  });
});

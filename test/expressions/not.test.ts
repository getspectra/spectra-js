import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, NotExpression } from '@/expressions';

describe('Not Expression', () => {
  test('base serialize', () => {
    const binary = new BinaryExpression('user.name', '<>', null);
    const not = new NotExpression(binary);
    const serializedNot = not.jsonSerialize();
    const expected = JSON.stringify({ not: ['user.name', '<>', null] });
    expect(serializedNot).toBe(expected);
  });
});

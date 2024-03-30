import { describe, expect, test } from '@jest/globals';
import { BinaryExpression } from '@/expressions';

describe('Binary Expression', () => {
  test('base serialize', () => {
    const binary = new BinaryExpression('user.id', '=', 1);
    const serializedBinary = binary.jsonSerialize();
    const expected = JSON.stringify(['user.id', '=', 1]);
    expect(serializedBinary).toBe(expected);
  });

  test('argument ref serialize', () => {
    const binary = new BinaryExpression('user.id', '=', {
      type: 'field',
      ref: 'file.creator_id',
    });
    const serializedBinary = binary.jsonSerialize();
    const expected = JSON.stringify([
      'user.id',
      '=',
      { type: 'field', ref: 'file.creator_id' },
    ]);
    expect(serializedBinary).toBe(expected);
  });
});

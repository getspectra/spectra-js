import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, OrExpression } from '@/expressions';

describe('Or Expression', () => {
  test('base serialize', () => {
    const userId = new BinaryExpression('user.id', '<>', null);
    const fileId = new BinaryExpression('file.id', '!=', null);
    const or = new OrExpression([userId, fileId]);
    const serializedOr = or.jsonSerialize();
    const expected = JSON.stringify({
      or: [
        ['user.id', '<>', null],
        ['file.id', '!=', null],
      ],
    });
    expect(serializedOr).toBe(expected);
  });
});

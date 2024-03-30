import { describe, expect, test } from '@jest/globals';
import { AndExpression, BinaryExpression, and, not, or } from '@/expressions';

describe('Expression Factory', () => {
  test('and factory for mixed expression', () => {
    const andExpression = and([
      ['user.id', '<>', 0],
      not(['user.name', '=', null]),
      or([
        ['team.name', '<>', null],
        ['team.alias', '!=', null],
      ]),
      new AndExpression([
        new BinaryExpression('file.id', '!=', 0),
        new BinaryExpression('file.name', '<>', null),
      ]),
    ]);
    const serializedAnd = andExpression.jsonSerialize();
    const expected = JSON.stringify({
      and: [
        ['user.id', '<>', 0],
        { not: ['user.name', '=', null] },
        {
          or: [
            ['team.name', '<>', null],
            ['team.alias', '!=', null],
          ],
        },
        {
          and: [
            ['file.id', '!=', 0],
            ['file.name', '<>', null],
          ],
        },
      ],
    });
    expect(serializedAnd).toBe(expected);
  });
});

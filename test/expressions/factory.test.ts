import { describe, expect, test } from '@jest/globals';
import { AndExpression, BinaryExpression, and, eq, gte, lt, not, or } from '@/index';

describe('Expression Factory', () => {
  test('mixed expressions', () => {
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
        {
          not: ['user.name', '=', null],
        },
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

  test('eq factory', () => {
    const eqExpression = eq('user.name', 'user_name');
    const serializedEq = eqExpression.jsonSerialize();
    const expected = JSON.stringify(['user.name', '=', 'user_name']);
    expect(serializedEq).toBe(expected);
  });

  test('gte factory', () => {
    const gteExpression = gte('user.age', 18);
    const serializedGte = gteExpression.jsonSerialize();
    const expected = JSON.stringify(['user.age', '>=', 18]);
    expect(serializedGte).toBe(expected);
  });

  test('lt factory', () => {
    const ltExpression = lt('files.count', 10);
    const serializedLt = ltExpression.jsonSerialize();
    const expected = JSON.stringify(['files.count', '<', 10]);
    expect(serializedLt).toBe(expected);
  });
});

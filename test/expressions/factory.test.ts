import { describe, expect, test } from '@jest/globals';
import {
  AndExpression,
  BinaryExpression,
  and,
  not,
  eq,
  ne,
  neq,
  gt,
  gte,
  lt,
  lte,
} from '@/index';

describe('Expression Factory', () => {
  test('mixed expressions', () => {
    const andExpression = and([
      ['user.id', '<>', 0],
      {
        or: [
          ['team.name', '<>', null],
          ['team.alias', '!=', null],
        ],
      },
      not(['user.name', '=', null]),
      new AndExpression([
        new BinaryExpression('file.id', '!=', 0),
        new BinaryExpression('file.name', '<>', null),
      ]),
    ]);
    const serializedExpression = andExpression.jsonSerialize();
    const expected = JSON.stringify({
      and: [
        ['user.id', '<>', 0],
        {
          or: [
            ['team.name', '<>', null],
            ['team.alias', '!=', null],
          ],
        },
        {
          not: ['user.name', '=', null],
        },
        {
          and: [
            ['file.id', '!=', 0],
            ['file.name', '<>', null],
          ],
        },
      ],
    });
    expect(serializedExpression).toBe(expected);
  });

  test('eq factory', () => {
    const expression = eq('user.name', 'user_name');
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['user.name', '=', 'user_name']);
    expect(serializedExpression).toBe(expected);
  });

  test('ne factory', () => {
    const expression = ne('user.name', 'user_name');
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['user.name', '!=', 'user_name']);
    expect(serializedExpression).toBe(expected);
  });

  test('neq factory', () => {
    const expression = neq('user.name', 'user_name');
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['user.name', '!=', 'user_name']);
    expect(serializedExpression).toBe(expected);
  });

  test('gt factory', () => {
    const expression = gt('user.age', 18);
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['user.age', '>', 18]);
    expect(serializedExpression).toBe(expected);
  });

  test('gte factory', () => {
    const expression = gte('user.age', 18);
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['user.age', '>=', 18]);
    expect(serializedExpression).toBe(expected);
  });

  test('lt factory', () => {
    const expression = lt('files.count', 10);
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['files.count', '<', 10]);
    expect(serializedExpression).toBe(expected);
  });

  test('lte factory', () => {
    const expression = lte('files.count', 9);
    const serializedExpression = expression.jsonSerialize();
    const expected = JSON.stringify(['files.count', '<=', 9]);
    expect(serializedExpression).toBe(expected);
  });
});

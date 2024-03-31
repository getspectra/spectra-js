import { describe, expect, test } from '@jest/globals';
import { BinaryExpression, Policy, and, bisectArray, parseDependences } from '@/index';

describe('Policy Utils', () => {
  test('bisectArray', () => {
    const mixedElements = [1, 2, '3', '4', 5, '6', 7];
    const [strings, numbers] = bisectArray(mixedElements, (e) => typeof e === 'string');
    expect(strings).toEqual(['3', '4', '6']);
    expect(numbers).toEqual([1, 2, 5, 7]);
  });

  test('parseDependences', () => {
    const policy = new Policy({
      applyFilter: and([
        new BinaryExpression('user.id', '=', 2),
        ['user.role', '=', 'admin'],
        ['user.age', '>', { type: 'field', ref: 'sys.age' }],
        { not: ['team.status', '=', 'inactive'] },
      ]),
      permissions: ['EDIT_FILE'],
      effect: 'DENY',
    });

    const dataDependencies = parseDependences(policy.getApplyFilter());
    expect(dataDependencies).toEqual({
      user: ['id', 'role', 'age'],
      team: ['status'],
      sys: ['age'],
    });
  });

  test('isArgumentRef', () => {});

  test('getValueFromKey', () => {});
});

describe('Compare Utils', () => {
  test('compareValue', () => {});
});

describe('Expression Utils', () => {
  test('isValidExpressionDefine', () => {});

  test('normalizeExpression', () => {});
});

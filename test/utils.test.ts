import { describe, expect, test } from '@jest/globals';
import {
  BinaryExpression,
  DataType,
  Policy,
  and,
  bisectArray,
  getValueFromKey,
} from '@/index';

describe('Policy Utils', () => {
  test('bisectArray', () => {
    const mixedElements = [1, 2, '3', '4', 5, '6', 7];
    const [strings, numbers] = bisectArray(mixedElements, (e) => typeof e === 'string');
    expect(strings).toEqual(['3', '4', '6']);
    expect(numbers).toEqual([1, 2, 5, 7]);
  });

  test('isArgumentRef', () => {});

  test('getValueFromKey', () => {
    const data: DataType = {
      'user.id': 1,
      'user.create_at': Date.now(),
    };

    expect(getValueFromKey(data, 'some')).toEqual(undefined);
    expect(getValueFromKey(data, 'user.id')).toEqual(data['user.id']);
    expect(getValueFromKey(data, { ref: 'user.create_at' })).toEqual(
      data['user.create_at']
    );
  });
});

describe('Compare Utils', () => {
  test('compareValue', () => {});
});

describe('Expression Utils', () => {
  test('isValidExpressionDefine', () => {});

  test('normalizeExpression', () => {
    const policy = new Policy({
      filter: and([
        new BinaryExpression('user.id', '=', 2),
        ['user.role', '=', 'admin'],
        ['user.age', '>', { ref: 'sys.age' }],
        { not: ['team.status', '=', 'inactive'] },
      ]),
      permissions: ['EDIT_FILE'],
      effect: 'DENY',
    });
    expect(policy.getFilter()).toBeTruthy();
  });
});

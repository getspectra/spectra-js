import { describe, expect, test } from '@jest/globals';
import {
  BinaryExpression,
  DataType,
  Policy,
  and,
  or,
  bisectArray,
  getValueFromKey,
  isRefValue,
  isValidAndExpressionDefinition,
  isValidBinaryExpressionDefinition,
  isDataLoaderClass,
  isDataLoaderFunction,
  compareValue,
} from '@/index';

describe('Policy Utils', () => {
  test('bisectArray', () => {
    const mixedElements = [1, 2, '3', '4', 5, '6', 7];
    const [strings, numbers] = bisectArray(mixedElements, (e) => typeof e === 'string');
    expect(strings).toEqual(['3', '4', '6']);
    expect(numbers).toEqual([1, 2, 5, 7]);
  });
});

describe('DataLoader Utils', () => {
  test('isDataLoaderClass', () => {
    expect(isDataLoaderClass({ load: () => {} })).toBeTruthy();
    expect(isDataLoaderClass({ load: {} })).toBeFalsy();
    expect(isDataLoaderFunction(() => {})).toBeTruthy();
    expect(isDataLoaderFunction({})).toBeFalsy();
  });
});

describe('Evaluate Utils', () => {
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

  test('compareArray', () => {
    expect(compareValue<any>(2, 'in', [1, 2, 3])).toBeTruthy();
    expect(compareValue<any>(4, 'nin', [1, 4])).toBeFalsy();
    expect(compareValue<any>(4, 'not_in', [1, 2, 3, 4])).toBeFalsy();
    expect(compareValue<any>('2', 'in', [1, 2, 3])).toBeFalsy();

    let invalidCompareArray = false;
    try {
      compareValue<any>(2, 'in', 2);
    } catch (error) {
      invalidCompareArray = true;
    }
    expect(invalidCompareArray).toBeTruthy();

    let invalidOperation = false;
    try {
      compareValue<any>(2, 'n_in' as any, [2, 3]);
    } catch (error) {
      invalidOperation = true;
    }
    expect(invalidOperation).toBeTruthy();
  });

  test('compareValue', () => {
    expect(compareValue(2, '=', 2)).toBeTruthy();
    expect(compareValue(2, '!=', 2)).toBeFalsy();
    expect(compareValue(2, '!=', 3)).toBeTruthy();
    expect(compareValue(2, '<>', 2)).toBeFalsy();
    expect(compareValue(2, '>', 1)).toBeTruthy();
    expect(compareValue(2, '>=', 2)).toBeTruthy();
    expect(compareValue(2, '<', 3)).toBeTruthy();
    expect(compareValue(2, '<=', 2)).toBeTruthy();
    expect(compareValue<any>(2, '!=', '2')).toBeTruthy();
    expect(compareValue<any>(2, '<>', '2')).toBeTruthy();
  });
});

describe('Expression Utils', () => {
  test('isRefValue', () => {
    expect(isRefValue({ ref: 'user.id' })).toBeTruthy();
    expect(isRefValue('user.id')).toBeFalsy();
    expect(isRefValue(1)).toBeFalsy();
    expect(isRefValue(true)).toBeFalsy();
    expect(isRefValue(null)).toBeFalsy();
    expect(isRefValue(undefined)).toBeFalsy();
    expect(isRefValue([])).toBeFalsy();
    expect(isRefValue({})).toBeFalsy();
    expect(isRefValue(new Date())).toBeFalsy();
    expect(isRefValue(new Error())).toBeFalsy();
  });

  test('isValidBinaryExpressionDefinition', () => {
    expect(isValidBinaryExpressionDefinition(['user.role', '=', 'admin'])).toBeTruthy();
    expect(isValidBinaryExpressionDefinition([])).toBeFalsy();
    expect(isValidBinaryExpressionDefinition([1, 2, 3, 4])).toBeFalsy();
    expect(isValidBinaryExpressionDefinition([1, 2, 4])).toBeFalsy();
    expect(isValidBinaryExpressionDefinition(['1', '!', 4])).toBeFalsy();
  });

  test('isValidAndExpressionDefinition', () => {
    const isValid = isValidAndExpressionDefinition;
    expect(isValid('')).toBeFalsy();
    expect(isValid({ and: [['user.role', '=', 'admin']] })).toBeFalsy();
    expect(isValid({ and: [['user.role', '=', 'admin'], []] })).toBeTruthy();
    expect(isValid({ and: ['user.role', '=', 'admin'] })).toBeTruthy();
  });

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

    let invalidDefinition = false;
    try {
      or([
        { and: [['user.role', '=', 'admin'], []] },
        { a: ['user.role', '=', 'admin', ''] } as any,
      ]);
    } catch (error) {
      invalidDefinition = true;
    }
    expect(invalidDefinition).toBeTruthy();
  });
});

import { describe, expect, test } from '@jest/globals';
import { bisectArray } from '@/index';

describe('Utils', () => {
  test('bisectArray', () => {
    const mixedElements = [1, 2, '3', '4', 5, '6', 7];
    const [strings, numbers] = bisectArray(mixedElements, (e) => typeof e === 'string');
    expect(strings).toEqual(['3', '4', '6']);
    expect(numbers).toEqual([1, 2, 5, 7]);
  });

  test('compare', () => {});

  test('expression', () => {});
});

import { describe, expect, test } from '@jest/globals';
import { Policy } from '@/policy';
import { BinaryExpression } from '@/expressions';

describe('Policies', () => {
  test('allow and deny', () => {
    const allowPolicy = new Policy({
      applyFilter: new BinaryExpression('user.id', '=', 1),
      permissions: ['EDIT_FILE'],
      effect: 'ALLOW',
    });

    const denyPolicy = new Policy({
      applyFilter: new BinaryExpression('user.id', '=', 2),
      permissions: ['EDIT_FILE'],
      effect: 'DENY',
    });

    expect(allowPolicy.getEffect()).toBe('ALLOW');
    expect(denyPolicy.getEffect()).toBe('DENY');
  });
});

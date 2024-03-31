import { describe, expect, test } from '@jest/globals';
import { Policy, BinaryExpression } from '@/index';

describe('Policies', () => {
  test('getter', () => {
    const allowPolicy = new Policy({
      applyFilter: new BinaryExpression('user.id', '=', 1),
      permissions: ['EDIT_FILE'],
      effect: 'ALLOW',
    });

    expect(allowPolicy.getEffect()).toBe('ALLOW');
  });

  test('complex policies', () => {
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

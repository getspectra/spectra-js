import { describe, expect, test } from '@jest/globals';
import { Policy, BinaryExpression, Spectra } from '@/index';

describe('Policies', () => {
  test('getter', () => {
    const allowPolicy = new Policy({
      filter: new BinaryExpression('user.id', '=', 1),
      permissions: ['EDIT_FILE'],
      effect: 'ALLOW',
    });

    expect(allowPolicy.getEffect()).toBe('ALLOW');
  });

  test('complex policies', () => {
    const allowPolicy = new Policy({
      filter: new BinaryExpression('user.id', '=', 1),
      permissions: ['EDIT_FILE'],
      effect: 'ALLOW',
    });

    const denyPolicy = new Policy({
      filter: new BinaryExpression('user.id', '=', 2),
      permissions: ['EDIT_FILE'],
      effect: 'DENY',
    });

    const result = Spectra.validate(
      [allowPolicy, denyPolicy],
      { load: () => ({ 'user.id': 1 }) },
      'EDIT_FILE'
    );

    expect(result).toBe(true);
  });
});

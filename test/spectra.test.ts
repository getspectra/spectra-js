import { describe, expect, test } from '@jest/globals';
import { Spectra, Policy, BinaryExpression } from '@/index';

describe('Spectra', () => {
  test('basic usage', () => {
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

    const truthyResult = Spectra.validate(
      [allowPolicy, denyPolicy],
      () => ({ 'user.id': 1 }),
      'EDIT_FILE'
    );
    expect(truthyResult).toBeTruthy();

    const falsyResult = Spectra.validate(
      [allowPolicy, denyPolicy],
      () => ({ 'user.id': 2 }),
      'EDIT_FILE'
    );
    expect(falsyResult).toBeFalsy();
  });
});

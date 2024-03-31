import { describe, expect, test } from '@jest/globals';
import { Spectra, Policy, BinaryExpression } from '@/index';

describe('Spectra', () => {
  test('basic usage', () => {
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

    const truthyResult = Spectra.validate([allowPolicy, denyPolicy], { 'user.id': 1 });
    expect(truthyResult).toBeTruthy();

    const falsyResult = Spectra.validate([allowPolicy, denyPolicy], { 'user.id': 2 });
    expect(falsyResult).toBeFalsy();
  });
});

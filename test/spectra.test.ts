import { describe, expect, test } from '@jest/globals';
import { Spectra } from '@/index';
import { Policy } from '@/policy';
import { BinaryExpression } from '@/expressions';

describe('Spetra', () => {
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

    const resource = {
      user: { id: 1 },
    };

    const result = Spectra.validate([allowPolicy, denyPolicy], resource);
    expect(result).toBeFalsy();
  });
});

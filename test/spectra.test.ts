import { describe, expect, test } from '@jest/globals';
import { Spectra } from '../src/index';
import { Policy } from '../src/policy';
import { BinaryExpression } from '../src/expressions';

describe('Spetra', () => {
  test('base', () => {
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
    expect(result).toBe(false);
  });
});

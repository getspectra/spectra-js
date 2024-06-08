import { describe, expect, test } from '@jest/globals';
import { Spectra, Policy, BinaryExpression, and } from '@/index';
import debug_and from './fixtures/debug_and.json';

describe('Debugger', () => {
  test('basic usage', () => {
    const allowPolicy = new Policy({
      filter: and([debug_and as any]),
      permissions: ['EDIT_FILE'],
      effect: 'ALLOW',
    });

    const denyPolicy = new Policy({
      filter: new BinaryExpression('user.id', '=', 2),
      permissions: ['EDIT_FILE'],
      effect: 'DENY',
    });

    const reporter = Spectra.debug(
      [allowPolicy, denyPolicy],
      () => ({ 'user.id': 1 }),
      'EDIT_FILE'
    );

    expect(reporter).toBeTruthy();
  });
});

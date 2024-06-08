import { describe, expect, test } from '@jest/globals';
import { Policy, BinaryExpression, not, and, AndExpression } from '@/index';

describe('Policies', () => {
  test('get properties', () => {
    const policy = new Policy({
      description: 'Readonly policy',
      permissions: ['READ_ONLY'],
      effect: 'DENY',
      filter: new BinaryExpression('user.id', '=', 2),
    });

    expect(policy.getEffect()).toBe('DENY');
    expect(policy.getPermissions()).toEqual(['READ_ONLY']);
    expect(policy.getDescription()).toEqual('Readonly policy');
    expect(policy.getFilter().getFields()).toEqual(['user.id']);
  });

  test('complex policies', () => {
    const allowPolicy = new Policy({
      filter: and([
        ['user.id', '<>', 0],
        {
          or: [
            ['team.name', '<>', null],
            ['team.alias', '!=', { ref: 'team.name' }],
          ],
        },
        not(['user.name', '=', null]),
        new AndExpression([
          new BinaryExpression('file.id', '!=', 0),
          new BinaryExpression('file.name', '<>', null),
        ]),
      ]),
      permissions: ['READ_ONLY'],
      effect: 'ALLOW',
    });

    expect(allowPolicy.getFilter()).toBeTruthy();
  });
});

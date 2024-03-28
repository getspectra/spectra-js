import { ApplyEvaluator } from './apply-evaluator';
import { Policy } from './policy';
import { Resource } from './types';
import { bisectArray } from './utils';

export class Spectra {
  public static validate(policies: Array<Policy>, resource: Resource): boolean {
    const [denyPolicies, allowPolicies] = bisectArray(
      policies,
      (p) => p.getEffect() === 'DENY'
    );

    const shouldDeny = denyPolicies.every((p) => {
      return ApplyEvaluator.evaluate(resource, p.getApplyFilter());
    });

    if (shouldDeny) {
      return false;
    }

    return allowPolicies.every((p) => {
      return ApplyEvaluator.evaluate(resource, p.getApplyFilter());
    });
  }
}

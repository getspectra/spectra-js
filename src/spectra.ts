import { ApplyEvaluator } from '@/apply-evaluator';
import { Policy } from '@/policy';
import { DataInterface } from '@/types';
import { bisectArray } from '@/utils';

export class Spectra {
  public static validate(policies: Array<Policy>, data: DataInterface): boolean {
    const [denyPolicies, allowPolicies] = bisectArray(
      policies,
      (p) => p.getEffect() === 'DENY'
    );

    const shouldDeny = denyPolicies.every((p) => {
      return ApplyEvaluator.evaluate(data, p.getApplyFilter());
    });

    if (shouldDeny) {
      return false;
    }

    return allowPolicies.every((p) => {
      return ApplyEvaluator.evaluate(data, p.getApplyFilter());
    });
  }
}

import { FieldName } from '@getspectra/spectra-typings';
import { Evaluator } from '@/evaluator';
import { Debugger } from '@/debugger';
import { Policy } from '@/policy';
import { bisectArray, isDataLoaderClass, isDataLoaderFunction } from '@/utils';
import {
  DataType,
  DataLoaderFunction,
  DataLoaderInterface,
  SpectraDebugReport,
  PolicyDebugReport,
} from '@/types';

export class Spectra {
  public static validate(
    policies: Array<Policy>,
    dataLoader: DataLoaderInterface | DataLoaderFunction,
    permissionName: string
  ): boolean {
    const relatedPolicies = policies.filter((p) => {
      return p.getPermissions().includes(permissionName);
    });

    const relatedData = this.loadRelatedData(dataLoader, relatedPolicies);

    const [denyPolicies, allowPolicies] = bisectArray(
      relatedPolicies,
      (p) => p.getEffect() === 'DENY'
    );

    const shouldDeny = denyPolicies.every((p) => {
      return Evaluator.evaluate(relatedData, p.getFilter());
    });

    if (shouldDeny) {
      return false;
    }

    return allowPolicies.every((p) => {
      return Evaluator.evaluate(relatedData, p.getFilter());
    });
  }

  public static debug(
    policies: Array<Policy>,
    dataLoader: DataLoaderInterface | DataLoaderFunction,
    permissionName: string
  ): SpectraDebugReport {
    const relatedPolicies = policies.filter((p) => {
      return p.getPermissions().includes(permissionName);
    });

    const relatedData = this.loadRelatedData(dataLoader, relatedPolicies);

    const relatedFields = relatedPolicies.reduce((memo, p) => {
      memo.concat(p.getFilter().getFields());
      return memo;
    }, [] as SpectraDebugReport['fields']);

    const policiesReport = policies.map((p) => {
      const matched = p.getPermissions().includes(permissionName);

      const [denyPolicies, allowPolicies] = bisectArray(
        relatedPolicies,
        (p) => p.getEffect() === 'DENY'
      );

      const shouldDeny = denyPolicies.every((p) => {
        return Evaluator.evaluate(relatedData, p.getFilter());
      });

      const applied = shouldDeny
        ? false
        : allowPolicies.every((p) => {
            return Evaluator.evaluate(relatedData, p.getFilter());
          });

      return {
        matched,
        applied,
        fields: p.getFilter().getFields(),
        filter: Debugger.debug(relatedData, p.getFilter(), {}),
      } as PolicyDebugReport;
    });

    return {
      policies: policiesReport,
      data: relatedData,
      fields: relatedFields,
    };
  }

  /* ====== private ====== */

  private static loadRelatedData(
    loader: DataLoaderInterface | DataLoaderFunction,
    policies: Array<Policy>
  ): DataType {
    let loadFunction: DataLoaderFunction;

    if (isDataLoaderFunction(loader)) {
      loadFunction = loader;
    } else if (isDataLoaderClass(loader)) {
      loadFunction = loader.load;
    } else {
      throw new Error('[spectra] Invalid data loader.');
    }

    const relatedPolicies = policies.reduce((memo, p) => {
      memo.concat(p.getFilter().getFields());
      return memo;
    }, [] as Array<FieldName>);

    return loadFunction(relatedPolicies);
  }
}

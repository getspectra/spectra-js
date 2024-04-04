import {
  Value,
  FieldName,
  ArrayOperation,
  Operation,
  RefValue,
} from '@getspectra/spectra-typings';
import { DataType, OperationEnum } from '@/types';
import { isRefValue } from './expression';

/**
 * @description Get the value from the key.
 */
export function getValueFromKey(data: DataType, key: FieldName | RefValue): Value {
  if (key !== null && isRefValue(key)) {
    return data[key.ref];
  }

  return data[key];
}

/**
 * @description Compare an array with a value based on an operation.
 */
function compareArray<T>(leftValue: T, operation: ArrayOperation, rightValue: Array<T>) {
  switch (operation) {
    case OperationEnum.IN:
      return rightValue.includes(leftValue);
    case OperationEnum.NIN:
    case OperationEnum.NOT_IN:
      return !rightValue.includes(leftValue);
    default:
      throw new Error(
        `[spectra] Operation is not supported. ${leftValue} ${operation} ${rightValue}`
      );
  }
}

/**
 * @description Compare two values based on an operation.
 */
export function compareValue<T = number>(
  leftValue: T,
  operation: Operation,
  rightValue: T
) {
  switch (operation) {
    case OperationEnum.EQ:
      return leftValue === rightValue;
    case OperationEnum.NEQ:
    case OperationEnum.NEQ2:
      return leftValue !== rightValue;
    case OperationEnum.GT:
      return leftValue > rightValue;
    case OperationEnum.GTE:
      return leftValue >= rightValue;
    case OperationEnum.LT:
      return leftValue < rightValue;
    case OperationEnum.LTE:
      return leftValue <= rightValue;
    default:
      if (!Array.isArray(leftValue) && Array.isArray(rightValue)) {
        return compareArray(leftValue, operation as ArrayOperation, rightValue);
      } else {
        throw new Error(
          `[spectra] Operation is not supported. ${leftValue} ${operation} ${rightValue}`
        );
      }
  }
}

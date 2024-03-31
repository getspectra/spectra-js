export type NumberOperation = '=' | '!=' | '<>' | '>' | '>=' | '<' | '<=';

export type ArrayOperation = 'in' | 'nin' | 'not_in';

export type Operation = NumberOperation | ArrayOperation;

export enum OperationEnum {
  EQ = '=',
  NEQ = '!=',
  NEQ2 = '<>',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  IN = 'in',
  NIN = 'nin',
  NOT_IN = 'not_in',
}

export const enum OperationEnum {
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

export const OperationName = {
  [OperationEnum.EQ]: 'EQ',
  [OperationEnum.NEQ]: 'NEQ',
  [OperationEnum.NEQ2]: 'NEQ2',
  [OperationEnum.GT]: 'GT',
  [OperationEnum.GTE]: 'GTE',
  [OperationEnum.LT]: 'LT',
  [OperationEnum.LTE]: 'LTE',
  [OperationEnum.IN]: 'IN',
  [OperationEnum.NIN]: 'NIN',
  [OperationEnum.NOT_IN]: 'NOT_IN',
} as const;

export const LogicOperationName = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
};

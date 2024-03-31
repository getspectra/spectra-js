import { Operation } from './operation';

export type FieldName = `${string}.${string}`;

export type FieldValue = ArgumentValue | ArgumentRef;

export type ArgumentValue = string | boolean | number | Date | null;

export type ArgumentRef = { type: 'field'; ref: FieldName };

export type ExpressionDefine =
  | BinaryExpressionDefine
  | OrExpressionDefine
  | AndExpressionDefine
  | NotExpressionDefine;

export type BinaryExpressionDefine = [FieldName, Operation, FieldValue];

export type OrExpressionDefine = {
  or: Array<ExpressionDefine>;
};

export type AndExpressionDefine = {
  and: Array<ExpressionDefine>;
};

export type NotExpressionDefine = {
  not: ExpressionDefine;
};

export type FieldName = string;

export type Value = string | boolean | number | Date | null;

export type Operation = '=' | '<>' | '>' | '<' | '>=' | '<=';

export type ArgumentRef = { type: 'field'; ref: FieldName };

export type Effect = 'ALLOW' | 'DENY';

export type Resource = Record<string, any>;

export type ExpressionDef = BinaryExpressionDef | OrExpressionDef | AndExpressionDef;

export type BinaryExpressionDef = [FieldName, Operation, Value | ArgumentRef];

export type OrExpressionDef = {
  or: ExpressionDef[];
};

export type AndExpressionDef = {
  and: ExpressionDef[];
};

export type NotExpressionDef = {
  not: ExpressionDef[];
};

export type ExpressionInterface = {
  serialize: (expression: object) => string;
  deserialize: (expression: string) => object;
  evaluate: (data: object) => boolean;
};

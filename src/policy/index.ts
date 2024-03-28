import { Effect, ExpressionInterface, PolicyInterface } from '../types';

export class Policy {
  private description: string;
  private applyFilter: ExpressionInterface;
  private permissions: Array<string>;
  private effect: Effect;

  constructor({ description = '', applyFilter, permissions, effect }: PolicyInterface) {
    this.description = description;
    this.applyFilter = applyFilter;
    this.permissions = permissions;
    this.effect = effect;
  }

  public getDescription(): string {
    return this.description;
  }

  public getApplyFilter(): ExpressionInterface {
    return this.applyFilter;
  }

  public getPermissions(): Array<string> {
    return this.permissions;
  }

  public getEffect(): Effect {
    return this.effect;
  }
}

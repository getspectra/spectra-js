import { PolicyEffect, ExpressionInterface, PolicyInterface } from '@/types';

export class Policy {
  private description: string;
  private permissions: Array<string>;
  private effect: PolicyEffect;
  private filter: ExpressionInterface;

  constructor({ description = '', permissions, filter, effect }: PolicyInterface) {
    this.description = description;
    this.permissions = permissions;
    this.effect = effect;
    this.filter = filter;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPermissions(): Array<string> {
    return this.permissions;
  }

  public getEffect(): PolicyEffect {
    return this.effect;
  }

  public getFilter(): ExpressionInterface {
    return this.filter;
  }
}

import { IsClass } from "../typedefs/common";

export abstract class Module {
  protected readonly container = new Map();

  public get<T>(token: IsClass<T>): T {
    return this.container.get(token);
  }

  public register<T>(element: T) {
    this.container.set(element.constructor, element);
  }
}

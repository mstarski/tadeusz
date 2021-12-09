import { IControllerConfig } from "../utils/controller";

export type IsClass<T> = new (...args: any[]) => T;

export type ControllerFactory<T> = (props: IControllerConfig) => T;

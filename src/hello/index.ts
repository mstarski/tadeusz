import { HelloController } from "./hello.controller";
import { IControllerConfig } from "../utils/controller";
import { ControllerFactory } from "../typedefs/common";

export const helloController: ControllerFactory<HelloController> = (
  props: IControllerConfig
) => new HelloController(props);

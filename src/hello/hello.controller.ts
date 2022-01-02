import { Controller, IControllerConfig } from "../utils/controller";
import { Interaction } from "discord.js";

export class HelloController extends Controller {
  constructor(props: IControllerConfig) {
    super(props);
  }

  // When the client is ready, run this code (only once)
  execute(interaction: Interaction): void {
    console.log(
      `Tadeusz [DEPLOY TEST123] is ready as ${this.client.user.tag}.`
    );
  }
}

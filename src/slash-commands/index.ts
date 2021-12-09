import { SlashCommandsRepository } from "./slash-commands.repository";
import { SlashCommandsController } from "./slash-commands.controller";
import { IControllerConfig } from "../utils/controller";
import { PlayCommand } from "./cmd/play.command";
import { ControllerFactory } from "../typedefs/common";

export const slashCommandRepository = new SlashCommandsRepository();

export const slashCommandsController: ControllerFactory<SlashCommandsController> =
  (config: IControllerConfig) =>
    new SlashCommandsController(config, slashCommandRepository);

export const playCommand = new PlayCommand();

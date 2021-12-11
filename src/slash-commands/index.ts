import { SlashCommandsRepository } from "./slash-commands.repository";
import { SlashCommandsController } from "./slash-commands.controller";
import { IControllerConfig } from "../utils/controller";
import { PlayCommand } from "./cmd/play.command";
import { ControllerFactory } from "../typedefs/common";
import { connectionService } from "../connection";
import { musicPlayerService } from "../music";

// Repositories
export const slashCommandRepository = new SlashCommandsRepository();

// Controllers
export const slashCommandsController: ControllerFactory<SlashCommandsController> =
  (config: IControllerConfig) =>
    new SlashCommandsController(
      config,
      slashCommandRepository,
      connectionService
    );

// Commands
export const playCommand = new PlayCommand(musicPlayerService);

import { SlashCommandsRepository } from "./slash-commands.repository";
import { SlashCommandsController } from "./slash-commands.controller";
import { IControllerConfig } from "../utils/controller";
import { PlayCommand } from "./cmd/music/play.command";
import { ControllerFactory } from "../typedefs/common";
import { connectionService } from "../connection";
import { musicPlayerService } from "../music";
import { PauseCommand } from "./cmd/music/pause.command";
import { ResumeCommand } from "./cmd/music/resume.command";

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
export const pauseCommand = new PauseCommand(musicPlayerService);
export const resumeCommand = new ResumeCommand(musicPlayerService);

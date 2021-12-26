import { SlashCommandsRepository } from "./slash-commands.repository";
import { SlashCommandsController } from "./slash-commands.controller";
import { IControllerConfig } from "../utils/controller";
import { PlayCommand } from "./cmd/music/play.command";
import { ControllerFactory } from "../typedefs/common";
import { connectionService } from "../connection";
import { musicPlayerService } from "../music";
import { PauseCommand } from "./cmd/music/pause.command";
import { ResumeCommand } from "./cmd/music/resume.command";
import { SkipCommand } from "./cmd/music/skip.command";
import { messagingService } from "../messaging";
import { GetMusicQueueCommand } from "./cmd/music/get-music-queue.command";

// Repositories
export const slashCommandRepository = new SlashCommandsRepository();

// Controllers
export const slashCommandsController: ControllerFactory<SlashCommandsController> =
  (config: IControllerConfig) =>
    new SlashCommandsController(
      config,
      slashCommandRepository,
      connectionService,
      messagingService
    );

// Commands
export const playCommand = new PlayCommand(
  musicPlayerService,
  messagingService
);
export const pauseCommand = new PauseCommand(
  musicPlayerService,
  messagingService
);
export const resumeCommand = new ResumeCommand(
  musicPlayerService,
  messagingService
);
export const skipCommand = new SkipCommand(
  musicPlayerService,
  messagingService
);
export const musicQueueCommand = new GetMusicQueueCommand(
  musicPlayerService,
  messagingService
);

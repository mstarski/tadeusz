import { SlashCommand } from "../../slash-command";
import { MusicPlayerService } from "../../../music/music-player.service";
import { slashCommandRepository } from "../../index";
import { CommandInteraction } from "discord.js";
import { NoMusicError } from "../../../errors/music.errors";
import { IMessagingService } from "../../../typedefs/discord";

export class SkipCommand extends SlashCommand {
  constructor(
    private readonly musicPlayerService: MusicPlayerService,
    private readonly messagingService: IMessagingService
  ) {
    super("skip", "Skip current song", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      await this.musicPlayerService.skip();
    } catch (error) {
      if (error instanceof NoMusicError) {
        return this.messagingService.sendMessage(error.message);
      } else {
        console.error(error);
        return this.messagingService.sendDefaultErrorMessage();
      }
    }
  }
}

import { SlashCommand } from "../../slash-command";
import { slashCommandRepository } from "../../index";
import { CommandInteraction } from "discord.js";
import { MusicPlayerService } from "../../../music/music-player.service";
import { NoMusicError } from "../../../errors/music.errors";
import { MessagingService } from "../../../messaging/messaging.service";

export class PauseCommand extends SlashCommand {
  constructor(
    private readonly musicPlayerService: MusicPlayerService,
    private readonly messagingService: MessagingService
  ) {
    super("pause", "Pause current song", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      await this.musicPlayerService.pause();
      return this.messagingService.sendMessage(
        `Song has been paused by ${interaction.user.username}`
      );
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

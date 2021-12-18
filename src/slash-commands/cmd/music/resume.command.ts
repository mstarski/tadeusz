import { SlashCommand } from "../../slash-command";
import { slashCommandRepository } from "../../index";
import { CommandInteraction } from "discord.js";
import { MusicPlayerService } from "../../../music/music-player.service";
import { NoMusicError } from "../../../errors/music.errors";
import { MessagingService } from "../../../messaging/messaging.service";

export class ResumeCommand extends SlashCommand {
  constructor(
    private readonly musicPlayerService: MusicPlayerService,
    private readonly messagingService: MessagingService
  ) {
    super("wznów", "Wznów spauzowany utwór", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      await this.musicPlayerService.unpause();
      return this.messagingService.sendMessage("Song unpaused.");
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

import { SlashCommand } from "../../slash-command";
import { slashCommandRepository } from "../../index";
import { CommandInteraction } from "discord.js";
import { MusicPlayerService } from "../../../music/music-player.service";
import { NoMusicError } from "../../../errors/music.errors";

export class ResumeCommand extends SlashCommand {
  constructor(private readonly musicPlayerService: MusicPlayerService) {
    super("wznów", "Wznów spauzowany utwór", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      await this.musicPlayerService.unpause();
      return interaction.reply(`Song unpaused.`);
    } catch (error) {
      if (error instanceof NoMusicError) {
        return interaction.reply(error.message);
      } else {
        console.error(error);
        return interaction.reply("Ooops, something went wrong...");
      }
    }
  }
}

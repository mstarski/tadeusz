import { CommandInteraction } from "discord.js";
import { PlayCommand } from "./cmd/play";

export class SlashCommandsController {
  private readonly controller = {
    jebnij: this._playCommand.execute,
  };

  constructor(private readonly _playCommand: PlayCommand) {}

  async handleInteractions(interaction: CommandInteraction) {
    if (!interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    try {
      this.controller[commandName](interaction);
    } catch (err) {
      console.log(err);

      await interaction.reply("Not found.");
    }
  }
}

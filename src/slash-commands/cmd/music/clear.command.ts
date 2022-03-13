import { SlashCommand } from "../../slash-command";
import { CommandInteraction } from "discord.js";
import { slashCommandRepository } from "../../index";

export class ClearCommand extends SlashCommand {
  constructor(
    private readonly musicPlayerService,
    private readonly messagingService
  ) {
    super("clear", "Clear music queue", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      await this.musicPlayerService.clear();
      return this.messagingService.sendMessage(`Music queue has been cleared.`);
    } catch (error) {
      console.error(error);
      return this.messagingService.sendDefaultErrorMessage();
    }
  }
}

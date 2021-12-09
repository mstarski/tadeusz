import { CommandInteraction } from "discord.js";
import { Controller, IControllerConfig } from "../utils/controller";
import { SlashCommandsRepository } from "./slash-commands.repository";

export class SlashCommandsController extends Controller {
  constructor(
    props: IControllerConfig,
    private readonly slashCommandRepository: SlashCommandsRepository
  ) {
    super(props);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    const command = this.slashCommandRepository.findByName(commandName);

    if (!command) {
      await interaction.reply("Not found!");
    }

    await command.execute(interaction);
  }
}

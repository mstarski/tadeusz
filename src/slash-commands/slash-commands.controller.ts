import { CommandInteraction } from "discord.js";
import { Controller, IControllerConfig } from "../utils/controller";
import { SlashCommandsRepository } from "./slash-commands.repository";
import SlashCommandModule from "./slash-commands.module";

export class SlashCommandsController extends Controller {
  private readonly slashCommandRepository: SlashCommandsRepository;

  constructor(props: IControllerConfig) {
    super(props);

    this.slashCommandRepository = SlashCommandModule.get(
      SlashCommandsRepository
    );
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

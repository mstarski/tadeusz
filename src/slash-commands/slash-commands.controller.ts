import { CommandInteraction, GuildMember } from "discord.js";
import { Controller, IControllerConfig } from "../utils/controller";
import { SlashCommandsRepository } from "./slash-commands.repository";
import { ConnectionService } from "../connection/connection.service";

export class SlashCommandsController extends Controller {
  constructor(
    props: IControllerConfig,
    private readonly slashCommandRepository: SlashCommandsRepository,
    private readonly connectionService: ConnectionService
  ) {
    super(props);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isCommand()) {
      return;
    }

    this.setConnectionProps(interaction);

    const { commandName } = interaction;
    const command = this.slashCommandRepository.findByName(commandName);

    if (!command) {
      await interaction.reply("Not found!");
    }

    await command.execute(interaction);
  }

  private setConnectionProps(interaction: CommandInteraction) {
    this.connectionService.setGuildId(interaction.guild.id);
    this.connectionService.setChannelId(interaction.channel.id);
    this.connectionService.setVoiceAdapterCreator(
      interaction.guild.voiceAdapterCreator
    );
    this.connectionService.setCurrentUser(interaction.member as GuildMember);
  }
}

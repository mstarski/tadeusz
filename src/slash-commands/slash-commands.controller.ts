import { CommandInteraction, GuildMember } from "discord.js";
import { Controller, IControllerConfig } from "../utils/controller";
import { SlashCommandsRepository } from "./slash-commands.repository";
import { ConnectionService } from "../connection/connection.service";
import { IMessagingService } from "../typedefs/discord";
import { random as randomEmoji } from "node-emoji";

export class SlashCommandsController extends Controller {
  constructor(
    props: IControllerConfig,
    private readonly slashCommandRepository: SlashCommandsRepository,
    private readonly connectionService: ConnectionService,
    private readonly messagingService: IMessagingService
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
      await this.messagingService.sendMessage("Not found!");
    }

    const { emoji } = randomEmoji();

    await command.execute(interaction);
    await interaction.reply(emoji);
  }

  private setConnectionProps(interaction: CommandInteraction) {
    this.connectionService.guildId = interaction.guild.id;
    this.connectionService.channelId = interaction.channel.id;
    this.connectionService.voiceAdapterCreator =
      interaction.guild.voiceAdapterCreator;
    this.connectionService.currentUser = interaction.member as GuildMember;
  }
}

import { ISlashCommandOption, SlashCommand } from "../slash-command";
import { CommandInteraction, GuildMember } from "discord.js";
import { slashCommandRepository } from "../index";

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

const ytdl = require("ytdl-core-discord");

export class PlayCommand extends SlashCommand {
  constructor() {
    const options: ISlashCommandOption[] = [
      {
        name: "link",
        description: "Link do muzyczki",
        required: true,
      },
    ];

    super("jebnij", "Jebnij muzyczką", options, slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const member = interaction.member as GuildMember;
    const { value: link } = interaction.options.get("link");

    const connection = joinVoiceChannel({
      channelId: member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource(await ytdl(link));

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => connection.disconnect());

    await interaction.reply("Jebnąłem");
  }
}

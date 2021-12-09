import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { InternalDiscordGatewayAdapterCreator } from "discord.js";

class MusicService {
  private readonly queue = [];

  private connection: VoiceConnection;
  private channelId: string;
  private guildId: string;
  private adapterCreator: InternalDiscordGatewayAdapterCreator;

  play() {}

  stop() {}

  skip() {}

  private connectToVoiceChat(
    channelId: string,
    guildId: string,
    adapterCreator: InternalDiscordGatewayAdapterCreator
  ) {
    this.channelId = channelId;
    this.guildId = guildId;
    this.adapterCreator = adapterCreator;

    this.connection = joinVoiceChannel({
      channelId,
      guildId,
      adapterCreator,
    });
  }
}

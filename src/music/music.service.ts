import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { InternalDiscordGatewayAdapterCreator } from "discord.js";
import { YoutubeService } from "./youtube.service";

export class MusicPlayerService {
  private readonly queue = [];

  private connection: VoiceConnection;
  private channelId: string;
  private guildId: string;
  private adapterCreator: InternalDiscordGatewayAdapterCreator;

  constructor(private readonly youtubeService: YoutubeService) {}

  async play(url: string) {}

  async stop() {}

  async skip() {}

  getQueue() {
    return Object.freeze(this.queue);
  }

  private enqueueSong(): void {}

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

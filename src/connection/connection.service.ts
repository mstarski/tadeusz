import {
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnection,
} from "@discordjs/voice";
import {
  Client,
  GuildMember,
  InternalDiscordGatewayAdapterCreator,
} from "discord.js";
import { ConnectionToVoiceChatNotFoundError } from "../errors/common.errors";
import { IConnectionService } from "../typedefs/connection";

export class ConnectionService implements IConnectionService {
  client: Client;
  currentUser: GuildMember;
  channelId: string;
  guildId: string;

  voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;

  createVoiceChatConnection(): VoiceConnection {
    if (!this.isUserOnVoiceChat()) {
      throw new ConnectionToVoiceChatNotFoundError();
    }

    return joinVoiceChannel({
      channelId: this.currentUser.voice.channel.id,
      guildId: this.guildId,
      adapterCreator: this.voiceAdapterCreator,
    });
  }

  getVoiceChatConnection(): VoiceConnection {
    return getVoiceConnection(this.guildId);
  }

  disconnectFromVoiceChat(): boolean {
    const connection = this.getVoiceChatConnection();
    return connection?.disconnect();
  }

  isUserOnVoiceChat(): boolean {
    return !!this.currentUser.voice.channel;
  }
}

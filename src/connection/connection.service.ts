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

export class ConnectionService {
  /**
   * Discord client
   * @private
   */
  client: Client;

  /**
   * User that invokes the current interaction
   * @private
   */
  currentUser: GuildMember;

  /**
   * Id of a channel where user that executes command sits in
   * @private
   */
  channelId: string;

  /**
   * Id of a guild where the bot is being used in
   * @private
   */
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

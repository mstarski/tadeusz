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
  private client: Client;

  /**
   * User that invokes the current interaction
   * @private
   */
  private currentUser: GuildMember;

  /**
   * Id of a channel where user that executes command sits in
   * @private
   */
  private channelId: string;

  /**
   * Id of a guild where the bot is being used in
   * @private
   */
  private guildId: string;

  /**
   * Guild's voice adapter creator (used when establishing connection)
   * @private
   */
  private voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;

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

  disconnectFromVoiceChat() {
    const connection = this.getVoiceChatConnection();
    connection.disconnect();
  }

  isUserOnVoiceChat(): boolean {
    return !!this.currentUser.voice.channel;
  }

  setClient(client: Client) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  setChannelId(id: string) {
    this.channelId = id;
  }

  getChannelId() {
    return this.channelId;
  }

  setGuildId(id: string) {
    this.guildId = id;
  }

  setVoiceAdapterCreator(
    voiceAdapterCreator: InternalDiscordGatewayAdapterCreator
  ) {
    this.voiceAdapterCreator = voiceAdapterCreator;
  }

  setCurrentUser(user: GuildMember) {
    this.currentUser = user;
  }
}

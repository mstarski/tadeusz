import {
  Client,
  GuildMember,
  InternalDiscordGatewayAdapterCreator,
} from "discord.js";
import { VoiceConnection } from "@discordjs/voice";

export interface IConnectionService {
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

  createVoiceChatConnection: () => VoiceConnection;
  getVoiceChatConnection: () => VoiceConnection;
  disconnectFromVoiceChat: () => boolean;
  isUserOnVoiceChat: () => boolean;
}

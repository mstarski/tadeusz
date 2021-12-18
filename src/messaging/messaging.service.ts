import { ConnectionService } from "../connection/connection.service";
import { TextChannel } from "discord.js";
import { UNKNOWN_ERROR_CHAT_MESSAGE } from "../utils/const";

export class MessagingService {
  constructor(private connectionService: ConnectionService) {}

  async sendMessage(content: string) {
    const channel = this.getChannelInstance();
    await channel.send(content);
  }

  async sendDefaultErrorMessage() {
    const channel = this.getChannelInstance();
    await channel.send(UNKNOWN_ERROR_CHAT_MESSAGE);
  }

  private getChannelInstance(): TextChannel {
    const client = this.connectionService.getClient();
    const channelId = this.connectionService.getChannelId();
    return client.channels.cache.get(channelId) as TextChannel;
  }
}

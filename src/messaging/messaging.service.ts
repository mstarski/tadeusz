import { ConnectionService } from "../connection/connection.service";
import { TextChannel } from "discord.js";

export class MessagingService {
  constructor(private connectionService: ConnectionService) {}

  async sendMessage(content: string) {
    const client = this.connectionService.getClient();
    const channelId = this.connectionService.getChannelId();
    const channel = client.channels.cache.get(channelId) as TextChannel;

    return await channel.send(content);
  }
}

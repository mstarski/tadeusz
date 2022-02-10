import { SlashCommand } from "../../slash-command";
import { CommandInteraction } from "discord.js";
import { slashCommandRepository } from "../../index";
import { MusicPlayerService } from "../../../music/music-player.service";
import { IMessagingService } from "../../../typedefs/discord";

export class GetMusicQueueCommand extends SlashCommand {
  constructor(
    private readonly musicPlayerService: MusicPlayerService,
    private readonly messagingService: IMessagingService
  ) {
    super("music-queue", "Show queued songs.", [], slashCommandRepository);
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    const queue = await this.musicPlayerService.getQueue();

    if (queue.length === 0) {
      return this.messagingService.sendMessage("Queue is empty.");
    }

    // noinspection JSUnusedAssignment
    const queueView = queue.reduce(
      (result, song, idx) => (result += `${idx + 1}. ${song.title}\n`),
      ""
    );

    return this.messagingService.sendMessage(queueView);
  }
}

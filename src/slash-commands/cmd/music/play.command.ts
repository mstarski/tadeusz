import { SlashCommand } from "../../slash-command";
import { CommandInteraction } from "discord.js";
import { slashCommandRepository } from "../../index";
import { MusicPlayerService } from "../../../music/music-player.service";
import { YoutubeLink } from "../../../music/youtube-link";
import { bold, underline } from "../../../utils/markdown";
import { MessagingService } from "../../../messaging/messaging.service";
import { UNKNOWN_ERROR_CHAT_MESSAGE } from "../../../utils/const";

export class PlayCommand extends SlashCommand {
  private readonly errorMap = {
    InvalidYoutubeLinkError: "Invalid youtube link.",
    ConnectionToVoiceChatNotFoundError: "Connection to voice chat not found.",
  };

  constructor(
    private readonly musicPlayerService: MusicPlayerService,
    private readonly messagingService: MessagingService
  ) {
    super(
      "play",
      "Play the song from youtube link",
      [
        {
          name: "url",
          description: "Song's youtube url.",
          required: true,
        },
      ],

      slashCommandRepository
    );
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const link = new YoutubeLink(
        interaction.options.get("url").value as string
      );

      const queuedSong = await this.musicPlayerService.play(link);
      await this.messagingService.sendMessage(
        `Queued song: ${underline(bold(queuedSong.title))} by ${
          interaction.user.username
        }`
      );
    } catch (error) {
      const errorResponse = this.errorMap[error.constructor.name];

      if (!errorResponse) {
        console.error(error);
      }

      await this.messagingService.sendMessage(
        this.errorMap[error.constructor.name] || UNKNOWN_ERROR_CHAT_MESSAGE
      );
    }
  }
}

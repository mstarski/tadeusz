import { SlashCommand } from "../../slash-command";
import { CommandInteraction } from "discord.js";
import { slashCommandRepository } from "../../index";
import { MusicPlayerService } from "../../../music/music-player.service";
import { YoutubeLink } from "../../../music/youtube-link";
import { bold, underline } from "../../../utils/markdown";

export class PlayCommand extends SlashCommand {
  private readonly errorMap = {
    InvalidYoutubeLinkError: "Invalid youtube link.",
    ConnectionToVoiceChatNotFoundError: "Connection to voice chat not found.",
  };

  constructor(private readonly musicPlayerService: MusicPlayerService) {
    super(
      "jebnij",
      "Jebnij muzyczką",
      [
        {
          name: "link",
          description: "Link do muzyczki",
          required: true,
        },
      ],

      slashCommandRepository
    );
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const link = new YoutubeLink(
        interaction.options.get("link").value as string
      );

      const queuedSong = await this.musicPlayerService.play(link);
      await interaction.reply(
        `Queued song: ${underline(bold(queuedSong.title))} by ${
          interaction.user.username
        }`
      );
    } catch (error) {
      const errorResponse = this.errorMap[error.constructor.name];

      if (!errorResponse) {
        console.error(error);
      }

      await interaction.reply(
        this.errorMap[error.constructor.name] || "Oops, something went wrong..."
      );
    }
  }
}

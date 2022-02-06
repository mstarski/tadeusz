import { SlashCommand } from "../../slash-command";
import { slashCommandRepository } from "../../index";
import { CommandInteraction } from "discord.js";
import { AudioPlayerService } from "../../../music/audio-player.service";
import { MusicPlayerService } from "../../../music/music-player.service";

export class JoinVoiceCommand extends SlashCommand {
  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private musicPlayerService: MusicPlayerService
  ) {
    super(
      "join-voice",
      "Invite tadeusz to your voice chat",
      [],
      slashCommandRepository
    );
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    this.audioPlayerService.ensureVoiceChatConnection();
    await this.musicPlayerService.startAgain();
  }
}

import { YoutubeService } from "./youtube.service";
import { ConnectionService } from "../connection/connection.service";
import { YoutubeLink } from "./youtube-link";
import { Song } from "./song";
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { MessagingService } from "../messaging/messaging.service";
import { bold, underline } from "../utils/markdown";
import { NoMusicError, YoutubeDownloadError } from "../errors/music.errors";

export class MusicPlayerService {
  private readonly queue: Song[] = [];
  private readonly discordPlayer: AudioPlayer;

  private currentSong: Song;

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly connectionService: ConnectionService,
    private readonly messagingService: MessagingService
  ) {
    this.discordPlayer = createAudioPlayer();

    /**
     * Idle state event callback only starts after something was already
     * played.
     */
    this.discordPlayer.on(AudioPlayerStatus.Idle, async () => {
      this.currentSong = null;

      await this.checkQueue();
    });
  }

  async play(link: YoutubeLink): Promise<Song> {
    const { videoDetails: details } = await this.youtubeService.getInfo(link);
    const song = new Song(details);

    this.ensureVoiceChatConnection();

    await this.enqueueSong(song);
    return song;
  }

  async pause() {
    if (this.currentSong === null) {
      throw new NoMusicError("No song is currently being played.");
    }

    return this.discordPlayer.pause();
  }

  async unpause() {
    if (this.currentSong === null) {
      throw new NoMusicError("No song is currently being played.");
    }

    this.discordPlayer.unpause();
  }

  async skip() {
    if (
      this.discordPlayer.state.status !== AudioPlayerStatus.Playing ||
      this.currentSong === null
    ) {
      throw new NoMusicError("No song is currently being played.");
    }

    this.discordPlayer.pause();
    await this.checkQueue();
    this.discordPlayer.unpause();
  }

  getQueue() {
    return Object.freeze([...this.queue]);
  }

  private async enqueueSong(song: Song) {
    this.queue.unshift(song);

    if (this.discordPlayer.state.status === AudioPlayerStatus.Idle) {
      await this.checkQueue();
    }
  }

  /**
   * Checks queue for next song, if exists - download and play it.
   * Disconnects from the voice chat if queue's empty.
   * @private
   */
  private async checkQueue() {
    const connection = this.connectionService.getVoiceChatConnection();

    if (this.queue.length === 0) {
      return connection.disconnect();
    }

    try {
      this.currentSong = this.queue.pop();
      const audioFile = await this.youtubeService.download(this.currentSong);

      const resource = createAudioResource(audioFile);
      this.discordPlayer.play(resource);

      /**
       * Slightly throttle sending a message to prevent showing first 'Playing" before 'Queued' when
       * there are no songs in the queue.
       */
      setTimeout(() => {
        void this.messagingService.sendMessage(
          `Now playing: ${bold(underline(this.currentSong.title))}`
        );
      }, 1000);
    } catch (error) {
      if (error instanceof YoutubeDownloadError) {
        await this.messagingService.sendMessage(error.message);
      } else {
        await this.messagingService.sendDefaultErrorMessage();
      }
    }
  }

  private ensureVoiceChatConnection() {
    const connection = this.connectionService.getVoiceChatConnection();

    if (!connection) {
      const connection = this.createConnection();
      connection.subscribe(this.discordPlayer);
    }
  }

  private createConnection() {
    const connection = this.connectionService.createVoiceChatConnection();

    // Cleanup (i.e on kick)
    connection.on(VoiceConnectionStatus.Disconnected, () => {
      connection.destroy();
    });

    return connection;
  }
}

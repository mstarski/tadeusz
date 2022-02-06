import { YoutubeService } from "./youtube.service";
import { ConnectionService } from "../connection/connection.service";
import { YoutubeLink } from "./youtube-link";
import { Song } from "./song";
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioResource,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { bold, underline } from "../utils/markdown";
import { NoMusicError, YoutubeDownloadError } from "../errors/music.errors";
import { AudioAPI } from "../typedefs/music";
import { MessageAPI } from "../typedefs/discord";
import { MusicQueueService } from "./music-queue.service";

export class MusicPlayerService {
  private currentSong: Song;

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly connectionService: ConnectionService,
    private readonly messagingService: MessageAPI,
    private readonly audioPlayer: AudioAPI,
    private readonly musicQueueService: MusicQueueService
  ) {
    /**
     * Idle state event callback only starts after something was already
     * played.
     */

    this.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
      this.currentSong = null;

      await this.checkQueue();
    });
  }

  async play(link: YoutubeLink): Promise<Song> {
    const { videoDetails: details } = await this.youtubeService.getInfo(link);
    const song = Song.fromVideoDetails(details);

    this.ensureVoiceChatConnection();

    await this.enqueueSong(song);
    return song;
  }

  async pause() {
    if (!this.currentSong) {
      throw new NoMusicError("No song is currently being played.");
    }

    return this.audioPlayer.pause();
  }

  async unpause() {
    if (!this.currentSong) {
      throw new NoMusicError("No song is currently being played.");
    }

    this.audioPlayer.unpause();
  }

  async skip() {
    if (
      this.audioPlayer.state.status !== AudioPlayerStatus.Playing ||
      !this.currentSong
    ) {
      throw new NoMusicError("No song is currently being played.");
    }

    await this.pause();
    await this.checkQueue();
    await this.unpause();
  }

  async getQueue() {
    return await this.musicQueueService.getQueue();
  }

  private async enqueueSong(song: Song) {
    await this.musicQueueService.enqueue(song);

    if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
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
    const queueLength = await this.musicQueueService.getQueueLength();

    if (queueLength === 0) {
      return connection.disconnect();
    }

    try {
      this.currentSong = await this.musicQueueService.dequeue();
      const audioFile = await this.youtubeService.download(this.currentSong);

      const resource = createAudioResource(audioFile);
      this.audioPlayer.play(resource);

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
        console.log(error);

        await this.messagingService.sendDefaultErrorMessage();
      }
    }
  }

  private ensureVoiceChatConnection() {
    const connection = this.connectionService.getVoiceChatConnection();

    if (!connection) {
      const connection = this.createConnection();
      connection.subscribe(this.audioPlayer as AudioPlayer);
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

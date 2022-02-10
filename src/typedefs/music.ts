import {
  AudioPlayerState,
  AudioPlayerStatus,
  AudioResource,
  VoiceConnection,
} from "@discordjs/voice";
import { Song } from "../music/song";
import { YoutubeLink } from "../music/youtube-link";
import { videoInfo } from "ytdl-core";
import { Readable } from "stream";

export interface IAudioAPI {
  addListener<U>(event: U, listener): IAudioAPI;
  on<U>(event: U, listener): IAudioAPI;
  pause(interpolateSilence?: boolean): boolean;
  play<T>(resource: AudioResource<T>): void;
  stop(force?: boolean): boolean;
  unpause(): boolean;

  get playable(): VoiceConnection[];
  get state(): AudioPlayerState;
}

export interface IAudioPlayerService {
  ensureVoiceChatConnection: () => void;
  registerAction: (status: any, listener: any) => void;
  playPlayer: (resource: AudioResource<unknown>) => void;
  pausePlayer: () => void;
  unpausePlayer: () => void;
  getPlayerStatus: () => AudioPlayerStatus;
}

export interface IMusicQueueService {
  getQueue: () => Promise<Song[]>;
  getQueueLength: () => Promise<number>;
  dequeue: () => Promise<Song>;
  enqueue: (song: Song) => Promise<void>;
}

export interface IMusicPlayerService {
  play: (link: YoutubeLink) => Promise<Song>;
  pause: () => Promise<void>;
  unpause: () => Promise<void>;
  skip: () => Promise<void>;

  /**
   * Called when bot has been kicked/left from the voice channel
   * and user want to bring him back.
   *
   * If there was a song currently played - resume playing it
   * If there wasn't a song played - checkQueue
   */
  startAgain: () => Promise<void>;
}

export interface IYoutubeService {
  getInfo: (link: YoutubeLink) => Promise<videoInfo | null>;
  download: (song: Song) => Promise<Readable>;
}

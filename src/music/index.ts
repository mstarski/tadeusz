import { MusicPlayerService } from "./music-player.service";
import { connectionService } from "../connection";
import { YoutubeService } from "./youtube.service";
import { messagingService } from "../messaging";
import { MusicQueueService } from "./music-queue.service";
import { AudioPlayerService } from "./audio-player.service";
import { createAudioPlayer } from "@discordjs/voice";
import { IAudioAPI } from "../typedefs/music";

export const youtubeService = new YoutubeService();

export const musicQueueService = new MusicQueueService();

export const audioPlayerService = new AudioPlayerService(
  connectionService,
  createAudioPlayer() as IAudioAPI
);

export const musicPlayerService = new MusicPlayerService(
  youtubeService,
  connectionService,
  messagingService,
  audioPlayerService,
  musicQueueService
);

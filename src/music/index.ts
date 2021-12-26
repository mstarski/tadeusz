import { MusicPlayerService } from "./music-player.service";
import { connectionService } from "../connection";
import { YoutubeService } from "./youtube.service";
import { messagingService } from "../messaging";
import { createAudioPlayer } from "@discordjs/voice";
import { AudioAPI } from "../typedefs/music";

export const youtubeService = new YoutubeService();

export const musicPlayerService = new MusicPlayerService(
  youtubeService,
  connectionService,
  messagingService,
  createAudioPlayer() as AudioAPI
);

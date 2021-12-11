import { MusicPlayerService } from "./music-player.service";
import { connectionService } from "../connection";
import { YoutubeService } from "./youtube.service";
import { messagingService } from "../messaging";

export const youtubeService = new YoutubeService();

export const musicPlayerService = new MusicPlayerService(
  youtubeService,
  connectionService,
  messagingService
);

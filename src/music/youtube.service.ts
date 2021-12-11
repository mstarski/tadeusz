import ytdl from "ytdl-core-discord";
import { videoInfo } from "ytdl-core";
import { YoutubeLink } from "./youtube-link";
import { Song } from "./song";

export class YoutubeService {
  async getInfo(link: YoutubeLink): Promise<videoInfo | null> {
    return ytdl.getBasicInfo(link.value);
  }

  async download(song: Song) {
    return ytdl(song.url);
  }
}

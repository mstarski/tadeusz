import ytdl from "ytdl-core-discord";
import { videoInfo } from "ytdl-core";
import { Readable } from "stream";

export class YoutubeService {
  validateURL(url: string): boolean {
    return ytdl.validateURL(url);
  }

  getInfo(url: string): Promise<videoInfo> {
    return ytdl.getBasicInfo(url);
  }

  download(info: videoInfo): Readable {
    return ytdl.downloadFromInfo(info);
  }
}

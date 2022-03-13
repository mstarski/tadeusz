import ytdl from "ytdl-core-discord";
import { videoInfo } from "ytdl-core";
import { YoutubeLink } from "./youtube-link";
import { Song } from "./song";
import { YoutubeDownloadError } from "../errors/music.errors";
import { IYoutubeService } from "../typedefs/music";

export class YoutubeService implements IYoutubeService {
  async getInfo(link: YoutubeLink): Promise<videoInfo | null> {
    try {
      return ytdl.getBasicInfo(link.value);
    } catch {
      throw new YoutubeDownloadError(
        `Couldn't fetch info for video at: ${link.value}`
      );
    }
  }

  async download(song: Song) {
    const stream = await ytdl(song.url.value, {
      highWaterMark: 1 << 27,
      filter: "audioonly",
    });

    // Overwrite breaking error listener
    stream.removeAllListeners("error");

    stream.on("error", (err) => {
      stream.destroy();

      throw new YoutubeDownloadError(
        `Couldn't download this song: ${song.title} ${err}`
      );
    });

    return stream;
  }
}

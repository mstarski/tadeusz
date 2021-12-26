import ytdl from "ytdl-core-discord";
import { InvalidYoutubeLinkError } from "../errors/music.errors";

export class YoutubeLink {
  readonly value: string;

  constructor(url: string) {
    const isUrlValid = ytdl.validateURL(url);

    if (!isUrlValid) {
      throw new InvalidYoutubeLinkError(
        `Invalid youtube link provided: ${url}`
      );
    } else {
      this.value = url;
    }
  }
}

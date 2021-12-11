import { MoreVideoDetails } from "ytdl-core";
import { PrivateYoutubeVideoError } from "../errors/music.errors";

export class Song {
  public readonly title: string;
  public readonly id: string;
  public readonly url: string;

  constructor(details: MoreVideoDetails) {
    if (details.isPrivate) {
      throw new PrivateYoutubeVideoError("Can't use a private youtube video.");
    }

    this.title = details.title;
    this.id = details.videoId;
    this.url = details.video_url;
  }
}

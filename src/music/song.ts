import { PrivateYoutubeVideoError } from "../errors/music.errors";
import { MoreVideoDetails } from "ytdl-core";
import { YoutubeLink } from "./youtube-link";

export class Song {
  constructor(
    public readonly title: string,
    public readonly id: string,
    public readonly url: YoutubeLink,
    public readonly isPrivate: boolean
  ) {
    if (this.isPrivate) {
      throw new PrivateYoutubeVideoError("Can't use a private youtube video.");
    }
  }

  static fromVideoDetails(details: MoreVideoDetails) {
    return new Song(
      details.title,
      details.videoId,
      new YoutubeLink(details.video_url),
      details.isPrivate
    );
  }
}

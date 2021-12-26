import { TadeuszError } from "./common.errors";

export class InvalidYoutubeLinkError extends TadeuszError {
  constructor(message: string) {
    super(message);
  }
}

export class PrivateYoutubeVideoError extends TadeuszError {
  constructor(message: string) {
    super(message);
  }
}

export class NoMusicError extends TadeuszError {
  constructor(message: string) {
    super(message);
  }
}

export class YoutubeDownloadError extends TadeuszError {
  constructor(message: string) {
    super(message);
  }
}

import { TadeuszError } from "./common.errors";

export class InvalidYoutubeLinkError extends TadeuszError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class PrivateYoutubeVideoError extends TadeuszError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

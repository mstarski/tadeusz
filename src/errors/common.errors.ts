export class TadeuszError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotImplementedException extends TadeuszError {
  constructor(message: string = "Not implemented") {
    super(message);
  }
}

export class ConnectionToVoiceChatNotFoundError extends TadeuszError {
  constructor(message: string = "") {
    super(message);
  }
}

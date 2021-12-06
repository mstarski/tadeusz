export class NotImplementedException extends Error {
  constructor(message: string = "Not implemented") {
    super(message);
  }
}

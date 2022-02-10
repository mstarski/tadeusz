export class DBConnectionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

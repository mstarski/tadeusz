export interface MessageAPI {
  sendMessage(content: string): Promise<void>;
  sendDefaultErrorMessage(): Promise<void>;
}

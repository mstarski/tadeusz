export interface IMessagingService {
  sendMessage(content: string): Promise<void>;
  sendDefaultErrorMessage(): Promise<void>;
}

import { connectionService } from "../connection";

export const appExit = (error) => {
  console.error("An error has occured. Gracefully exiting an app...\n", error);

  connectionService.disconnectFromVoiceChat();

  process.kill(0);
};

export const onKill = () => {
  console.error("Shutting down Tadeusz...");

  connectionService.disconnectFromVoiceChat();

  process.kill(0);
};

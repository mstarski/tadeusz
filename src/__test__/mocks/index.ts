import { Readable } from "stream";
import { videoInfo } from "ytdl-core";
import {
  Client,
  GuildMember,
  InternalDiscordGatewayAdapterCreator,
} from "discord.js";
import {
  AudioPlayerStatus,
  AudioResource,
  VoiceConnection,
} from "@discordjs/voice";
import { AudioAPI } from "../../typedefs/music";
import { MessageAPI } from "../../typedefs/discord";
import { YoutubeLink } from "../../music/youtube-link";

export class MockYoutubeService {
  getInfo = jest.fn(
    async (link: YoutubeLink) =>
      ({
        videoDetails: {
          title: "foo",
          videoId: "bar",
          video_url: link.value,
          isPrivate: false,
        },
      } as videoInfo)
  );

  download = jest.fn(async (_videoInfo) => {
    const stream = new Readable();
    stream.destroy();

    return stream;
  });
}

export class MockConnectionService {
  client = {} as Client;
  currentUser = {} as GuildMember;
  channelId = "123";
  guildId = "123";
  voiceAdapterCreator = {} as InternalDiscordGatewayAdapterCreator;

  createVoiceChatConnection = jest.fn(() => ({} as VoiceConnection));
  getVoiceChatConnection = jest.fn(() => ({} as VoiceConnection));
  disconnectFromVoiceChat = jest.fn(() => true);
  isUserOnVoiceChat = jest.fn(() => true);
}

export class MockMessagingService implements MessageAPI {
  sendMessage = jest.fn(async () => {});
  sendDefaultErrorMessage = jest.fn(async () => {});
}

export class MockAudioPlayer implements AudioAPI {
  addListener = jest.fn();

  on = jest.fn();

  unpause() {
    this.state.status = AudioPlayerStatus.Playing;
    return true;
  }

  stop(force?: boolean) {
    this.state.status = AudioPlayerStatus.Idle;
    return true;
  }

  play(resource: AudioResource) {
    this.state.status = AudioPlayerStatus.Playing;
  }

  pause(interpolateSilence: boolean) {
    this.state.status = AudioPlayerStatus.Paused;
    return true;
  }

  state = { status: AudioPlayerStatus.Idle } as any;

  playable = [] as VoiceConnection[];
}

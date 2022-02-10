import { Readable } from "stream";
import { videoInfo } from "ytdl-core";
import {
  Client,
  GuildMember,
  InternalDiscordGatewayAdapterCreator,
} from "discord.js";
import { AudioPlayerStatus, VoiceConnection } from "@discordjs/voice";
import { IMessagingService } from "../../typedefs/discord";
import { YoutubeLink } from "../../music/youtube-link";
import { Song } from "../../music/song";

import { IConnectionService } from "../../typedefs/connection";
import {
  IAudioPlayerService,
  IMusicQueueService,
  IYoutubeService,
} from "../../typedefs/music";

export class MockYoutubeService implements IYoutubeService {
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

export class MockConnectionService implements IConnectionService {
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

export class MockMessagingService implements IMessagingService {
  sendMessage = jest.fn(async () => {});
  sendDefaultErrorMessage = jest.fn(async () => {});
}

export class MockAudioPlayerService implements IAudioPlayerService {
  state = { status: AudioPlayerStatus.Idle } as any;

  ensureVoiceChatConnection() {}

  unpausePlayer() {
    this.state.status = AudioPlayerStatus.Playing;
    return true;
  }

  pausePlayer() {
    this.state.status = AudioPlayerStatus.Paused;
    return true;
  }

  registerAction(_status, _listener) {}

  playPlayer() {
    this.state.status = AudioPlayerStatus.Playing;
  }

  getPlayerStatus() {
    return this.state.status;
  }
}

export class MockMusicQueueService implements IMusicQueueService {
  private queue: Song[] = [];

  async getQueue() {
    return this.queue;
  }

  async getQueueLength() {
    return this.queue.length;
  }

  async dequeue() {
    return this.queue.shift();
  }

  async enqueue(song: Song) {
    this.queue.push(song);
  }
}

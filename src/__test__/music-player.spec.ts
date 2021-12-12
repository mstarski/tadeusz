import { MusicPlayerService } from "../music/music-player.service";
import { YoutubeService } from "../music/youtube.service";
import { videoInfo } from "ytdl-core";
import { Readable } from "stream";
import { VoiceConnection } from "@discordjs/voice";
import { InternalDiscordGatewayAdapterCreator } from "discord.js";

describe("Music player functionalities", () => {
  let musicPlayer: MusicPlayerService;
  let sampleSongLink = "https://www.youtube.com/watch?v=R6jvSdomL_A";

  beforeEach(() => {
    const mockYoutubeService: YoutubeService = {
      getInfo: jest.fn(async (url) => ({} as videoInfo)),
      download: jest.fn((videoInfo) => new Readable()),
      validateURL: jest.fn((url) => true),
    };

    musicPlayer = new MusicPlayerService(mockYoutubeService);
    musicPlayer["connection"] = {} as VoiceConnection;
    musicPlayer["channelId"] = "123";
    musicPlayer["guildId"] = "123";
    musicPlayer["adapterCreator"] = {} as InternalDiscordGatewayAdapterCreator;

    jest
      .spyOn<any, any>(musicPlayer, "connectToVoiceChat")
      .mockImplementation(() => {});
  });

  describe("Playing music", () => {
    it("should establish connection before playing any music", async () => {
      musicPlayer["connection"] = undefined;

      await musicPlayer.play(sampleSongLink);

      expect(musicPlayer["connectToVoiceChat"]).toHaveBeenCalled();
    });

    it("should enqueue validated youtube song", async () => {
      await musicPlayer.play(sampleSongLink);

      expect(musicPlayer.getQueue()).toHaveLength(1);
    });

    it("shouldn't enqueue not valid youtube songs", async () => {
      await musicPlayer.play("foobar");

      expect(musicPlayer.getQueue()).toHaveLength(0);
    });
  });

  describe("Stopping music", () => {
    it.todo("should stop playing current song");

    it("should not dequeue current song", async () => {
      await musicPlayer.play(sampleSongLink);
      await musicPlayer.pause();

      expect(musicPlayer.getQueue()).toHaveLength(1);
    });
  });

  describe("Skipping music", () => {
    it.todo("should stop current song");

    it("should dequeue current song", async () => {
      await musicPlayer.play(sampleSongLink);
      await musicPlayer.skip();
    });
  });
});

import { MusicPlayerService } from "../music/music-player.service";
import {
  MockAudioPlayerService,
  MockConnectionService,
  MockMessagingService,
  MockMusicQueueService,
  MockYoutubeService,
} from "./mocks";
import { Song } from "../music/song";
import { YoutubeLink } from "../music/youtube-link";
import {
  IAudioPlayerService,
  IMusicQueueService,
  IYoutubeService,
} from "../typedefs/music";
import { IConnectionService } from "../typedefs/connection";
import { IMessagingService } from "../typedefs/discord";
import { NoMusicError } from "../errors/music.errors";

describe("Music player functionalities", () => {
  let musicPlayer: MusicPlayerService;
  let sampleLink: YoutubeLink;
  let sampleLink2: YoutubeLink;
  let sampleSong: Song;

  let ytService: IYoutubeService;
  let connectionService: IConnectionService;
  let messagingService: IMessagingService;
  let audioPlayerService: IAudioPlayerService;
  let musicQueueService: IMusicQueueService;

  beforeEach(() => {
    sampleLink = new YoutubeLink("https://www.youtube.com/watch?v=R6jvSdomL_A");
    sampleLink2 = new YoutubeLink(
      "https://www.youtube.com/watch?v=iutQJzAXiWo"
    );

    sampleSong = new Song("A test song", "123", sampleLink, false);

    ytService = new MockYoutubeService();
    connectionService = new MockConnectionService();
    messagingService = new MockMessagingService();
    audioPlayerService = new MockAudioPlayerService();
    musicQueueService = new MockMusicQueueService();

    musicPlayer = new MusicPlayerService(
      ytService,
      connectionService,
      messagingService,
      audioPlayerService,
      musicQueueService
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Playing music", () => {
    it("Should ensure that the connection is on", async () => {
      const ensureSpy = jest.spyOn(
        audioPlayerService,
        "ensureVoiceChatConnection"
      );

      await musicPlayer.play(sampleLink);

      expect(ensureSpy).toHaveBeenCalledTimes(1);

      expect(true);
    });
  });

  describe("Music queue", () => {
    it("Should automatically play the first song after it has been put to the queue", async () => {
      const enqueueSpy = jest.spyOn(musicQueueService, "enqueue");

      await musicPlayer.play(sampleLink);

      expect(enqueueSpy).toHaveBeenCalledTimes(1);
      expect(await musicPlayer.getQueue()).toHaveLength(0);
    });

    it("Should put a song onto queue when executing play", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink);

      expect(await musicPlayer.getQueue()).toHaveLength(2);
    });

    it("Should not change state when pausing", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.pause();

      expect(await musicPlayer.getQueue()).toHaveLength(1);
    });

    it("Should not change state when unpausing", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.pause();
      await musicPlayer.unpause();

      expect(await musicPlayer.getQueue()).toHaveLength(1);
    });

    it("Should dequeue a song when skipping", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.skip();

      expect(await musicPlayer.getQueue()).toHaveLength(0);
    });

    it("should be able to clear the queue completely", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.clear();

      expect(await musicPlayer.getQueue()).toHaveLength(0);
    });
  });

  describe("Pausing & unpausing", () => {
    it("Should throw when song is not being played", async () => {
      expect(musicPlayer["currentSong"]).toBe(undefined);
      await expect(musicPlayer.pause()).rejects.toThrowError(NoMusicError);
      await expect(musicPlayer.unpause()).rejects.toThrowError(NoMusicError);
    });
  });

  describe("Skipping music", () => {
    it("should pause current song", async () => {
      const pauseSpy = jest.spyOn(musicPlayer, "pause");

      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink2);

      await musicPlayer.skip();

      expect(pauseSpy).toHaveBeenCalledTimes(1);
    });

    it("should dequeue current song", async () => {
      await musicPlayer.play(sampleLink); // Gets dequeued first
      await musicPlayer.play(sampleLink); // Deuqueued and played after skip
      await musicPlayer.play(sampleLink2); // Last one left in the queue

      await musicPlayer.skip();

      expect(await musicPlayer.getQueue()).toHaveLength(1);
      expect((await musicPlayer.getQueue())[0].url.value).toBe(
        sampleLink2.value
      );
    });
  });
});

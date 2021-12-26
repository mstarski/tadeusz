import { MusicPlayerService } from "../music/music-player.service";
import {
  MockAudioPlayer,
  MockConnectionService,
  MockMessagingService,
  MockYoutubeService,
} from "./mocks";
import { Song } from "../music/song";
import { YoutubeLink } from "../music/youtube-link";
import { NoMusicError } from "../errors/music.errors";

describe("Music player functionalities", () => {
  let musicPlayer: MusicPlayerService;
  let sampleLink: YoutubeLink;
  let sampleLink2: YoutubeLink;
  let sampleSong: Song;

  beforeEach(() => {
    sampleLink = new YoutubeLink("https://www.youtube.com/watch?v=R6jvSdomL_A");
    sampleLink2 = new YoutubeLink(
      "https://www.youtube.com/watch?v=iutQJzAXiWo"
    );

    sampleSong = new Song("A test song", "123", sampleLink, false);

    musicPlayer = new MusicPlayerService(
      new MockYoutubeService(),
      new MockConnectionService(),
      new MockMessagingService(),
      new MockAudioPlayer()
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Playing music", () => {
    it("Should ensure that the connection is on", async () => {
      const ensureSpy = jest.spyOn<any, any>(
        musicPlayer,
        "ensureVoiceChatConnection"
      );

      await musicPlayer.play(sampleLink);

      expect(ensureSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Music queue", () => {
    it("Should put a song onto queue when executing play", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink);

      expect(musicPlayer.getQueue()).toHaveLength(2);
    });

    it("Should not change state when pausing", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.pause();

      expect(musicPlayer.getQueue()).toHaveLength(1);
    });

    it("Should not change state when unpausing", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.pause();
      await musicPlayer.unpause();

      expect(musicPlayer.getQueue()).toHaveLength(1);
    });

    it("Should dequeue a song when skipping", async () => {
      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.skip();

      expect(musicPlayer.getQueue()).toHaveLength(0);
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
      jest.spyOn(musicPlayer, "pause");

      await musicPlayer.play(sampleLink);
      await musicPlayer.play(sampleLink2);
      await musicPlayer.play(sampleLink2);

      await musicPlayer.skip();

      expect(musicPlayer.pause).toHaveBeenCalledTimes(1);
    });

    it("should dequeue current song", async () => {
      await musicPlayer.play(sampleLink); // Gets dequeued first
      await musicPlayer.play(sampleLink); // Deuqueued and played after skip
      await musicPlayer.play(sampleLink2); // Last one left in the queue

      await musicPlayer.skip();

      expect(musicPlayer.getQueue()).toHaveLength(1);
      expect(musicPlayer.getQueue()[0].url.value).toBe(sampleLink2.value);
    });
  });
});

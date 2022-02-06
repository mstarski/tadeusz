import { Song } from "./song";
import { ISongSchema, SongEntity } from "./song.entity";
import { YoutubeLink } from "./youtube-link";
import { SchemaModelFactory } from "../abstracts/schema-model-factory";

class SongFactory extends SchemaModelFactory<ISongSchema, Song> {
  fromModel(song: Song) {
    return new SongEntity({
      title: song.title,
      id: song.id,
      url: song.url.value,
      isPrivate: song.isPrivate,
      createdAt: song.createdAt,
    });
  }

  fromSchema(songSchema: ISongSchema) {
    return new Song(
      songSchema.title,
      songSchema.id,
      new YoutubeLink(songSchema.url),
      songSchema.isPrivate,
      songSchema.createdAt
    );
  }
}

export const songFactory = new SongFactory();

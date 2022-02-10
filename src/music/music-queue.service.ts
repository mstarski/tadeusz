import { Song } from "./song";
import { songFactory } from "./song.factory";
import { SongEntity } from "./song.entity";
import { IMusicQueueService } from "../typedefs/music";

export class MusicQueueService implements IMusicQueueService {
  async getQueue(): Promise<Song[]> {
    const songs = await SongEntity.find();
    return songs.map(songFactory.fromSchema);
  }

  async getQueueLength(): Promise<number> {
    return SongEntity.count();
  }

  async dequeue(): Promise<Song> {
    const songEntity = await SongEntity.findOne({ $sort: { _id: -1 } });
    await SongEntity.findOneAndDelete({ _id: songEntity._id }).exec();
    return songFactory.fromSchema(songEntity);
  }

  async enqueue(song: Song): Promise<void> {
    const songEntity = songFactory.fromModel(song);
    await songEntity.save();
  }
}

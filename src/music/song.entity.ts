import { model, Schema } from "mongoose";

export interface ISongSchema {
  title: string;
  id: string;
  url: string;
  isPrivate: boolean;
  createdAt: Date;
}

export const songSchema = new Schema<ISongSchema>({
  title: { type: String, required: true },
  id: { type: String, required: true },
  url: { type: String, required: true },
  isPrivate: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date() },
});

export const SongEntity = model("Song", songSchema);

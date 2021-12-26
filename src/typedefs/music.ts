import {
  AudioPlayerState,
  AudioResource,
  VoiceConnection,
} from "@discordjs/voice";

export interface AudioAPI {
  addListener<U>(event: U, listener): AudioAPI;
  on<U>(event: U, listener): AudioAPI;
  pause(interpolateSilence?: boolean): boolean;
  play<T>(resource: AudioResource<T>): void;
  stop(force?: boolean): boolean;
  unpause(): boolean;

  get playable(): VoiceConnection[];
  get state(): AudioPlayerState;
}

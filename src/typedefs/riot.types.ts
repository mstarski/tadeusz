// Typedefs for Riot API structures
// https://developer.riotgames.com

export interface IBannedChampion {
  pickTurn: number;
  championId: number;
  teamId: number;
}

export interface IPerks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

export interface IGameCustomizationObject {
  category: string;
  content: string;
}

export interface ICurrentGameParticipant {
  championId: number;
  perks: IPerks;
  profileIconId: number;
  bot: boolean;
  summonerName: string;
  summonerId: string;
  spell1Id: number;
  spell2Id: number;
  gameCustomizationObjects: IGameCustomizationObject[];
}

export interface IObserver {
  encryptionKey: string;
}

export interface ICurrentGameInfo {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: IBannedChampion[];
  gameQueueConfigId: number;
  observers: IObserver;
  participants: ICurrentGameParticipant;
}

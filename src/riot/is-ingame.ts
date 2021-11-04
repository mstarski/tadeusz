import { riotHttp } from "../common/http";
import { pipeP, tryCatch } from "ramda";
import { ICurrentGameInfo } from "../typedefs/riot.types";

const getGameHttp = (summonerId: string): Promise<ICurrentGameInfo> =>
  tryCatch(
    (response) => response.data,
    () => null
  )(
    riotHttp().get<ICurrentGameInfo>(
      `/spectator/v4/active-games/by-summoner/${summonerId}`
    )
  );

export const isIngame = (summonerId: string) =>
  pipeP<string, ICurrentGameInfo>(getGameHttp)(summonerId);

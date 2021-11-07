import { pipeP, tryCatch } from "ramda";
import { riotHttp } from "../common/http";

const getSummonerHttp = (ign: string) =>
  tryCatch(
    (response) => response.data,
    () => null
  )(() => riotHttp().get(`/summoner/v4/summoners/by-name/${ign}`));

export const getSummoner = (ign: string) => pipeP(getSummonerHttp)(ign);

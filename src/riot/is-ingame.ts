import { riotHttp } from "../common/http";
import { pipeP } from "ramda";

const nickname = "FPXD xiaolmao";

export const isIngame = () =>
  pipeP<void, any, any, any, any>(
    () => riotHttp().get(`/summoner/v4/summoners/by-name/${nickname}`),
    (response) => response.data.id,
    (id) =>
      riotHttp()
        .get(`/spectator/v4/active-games/by-summoner/${id}`)
        .catch((e) => e.response),
    (response) => response.data
  )();

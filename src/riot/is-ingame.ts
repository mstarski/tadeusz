// import { pipeP, tryCatch } from "ramda";
//
// const getGameHttp = (summonerId: string): Promise<ICurrentGameInfo> =>
//   tryCatch(
//     (response) => response.data,
//     () => null
//   )(
//     riotHttp().get<ICurrentGameInfo>(
//       `/spectator/v4/active-games/by-summoner/${summonerId}`
//     )
//   );
//
// export const isIngame = (summonerId: string) => pipeP(getGameHttp)(summonerId);

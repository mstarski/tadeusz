import axios from "axios";
import { config } from "./config";
import { ConfigKeys } from "../typedefs/config.types";

export const riotHttp = () =>
  axios.create({
    baseURL: config(ConfigKeys.RIOT_API_URL),

    params: {
      api_key: config(ConfigKeys.RIOT_API_KEY),
    },
  });

import { ConfigKeys } from "../typedefs/config.types";

export const config = (key: ConfigKeys): string | null =>
  process.env[key] || null;

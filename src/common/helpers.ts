import { pipe } from "ramda";

export const log = <T>(val: T) =>
  pipe<any, any, T>(console.log, () => val)(val);

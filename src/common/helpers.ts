import { pipe } from "ramda";

export const log = <T>(val: T) => pipe<T, void, T>(console.log, () => val)(val);

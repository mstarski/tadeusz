import { Expose, plainToClass } from "class-transformer";
import { IsDefined, validateSync } from "class-validator";
import { ConfigCreationError } from "../errors/config.errors";

require("dotenv").config();

class Config {
  @Expose()
  DISCORD_BOT_TOKEN: string;

  @Expose()
  DISCORD_CLIENT_ID: string;

  @Expose()
  DISCORD_GUILD_ID: string;

  @Expose()
  RIOT_API_KEY: string;

  @Expose()
  RIOT_API_URL: string;

  @Expose()
  @IsDefined()
  MONGO_URL: string;

  constructor() {
    // Do not create config using the `new` keyword.
    return undefined;
  }

  static create() {
    const instance = plainToClass(Config, process.env, {
      excludeExtraneousValues: true,
    });

    const validation = validateSync(instance);

    if (validation.length) {
      // noinspection JSUnusedAssignment
      const errorMessage = validation.reduce(
        (msg, err) => (msg += Object.values(err.constraints).join("\n") + "\n"),
        ""
      );

      throw new ConfigCreationError("Invalid config \n" + errorMessage);
    }

    return instance;
  }
}

export default Config.create();

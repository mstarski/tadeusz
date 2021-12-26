import { SlashCommand } from "./slash-command";
import { IsClass } from "../typedefs/common";
import config from "../utils/config";
import { Routes } from "discord-api-types/v9";

const { REST } = require("@discordjs/rest");

export class SlashCommandsRepository {
  private readonly commands = new Map();

  public getCommands(): [IsClass<SlashCommand>, SlashCommand][] {
    return Array.from(this.commands);
  }

  public getRawCommands() {
    return this.getCommands().map(([_, value]) => value.body);
  }

  public add(command: SlashCommand): void {
    this.commands.set(command.constructor, command);
  }

  public findByToken(token: IsClass<SlashCommand>): SlashCommand {
    return this.commands.get(token);
  }

  public findByName(name: string): SlashCommand {
    return this.getCommands().find(([_, value]) => value.body.name === name)[1];
  }

  public remove(token: IsClass<SlashCommand>): boolean {
    return this.commands.delete(token);
  }

  /**
   * Deploys command to discord
   */
  public async deploy() {
    const rest = new REST({ version: "9" }).setToken(config.DISCORD_BOT_TOKEN);

    return rest
      .put(
        Routes.applicationGuildCommands(
          config.DISCORD_CLIENT_ID,
          config.DISCORD_GUILD_ID
        ),
        {
          body: this.getRawCommands(),
        }
      )
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }
}

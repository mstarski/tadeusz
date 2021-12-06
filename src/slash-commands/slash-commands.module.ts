import { Module } from "../utils/module";
import { SlashCommandsRepository } from "./slash-commands.repository";
import config from "../utils/config";
import { PlayCommand } from "./cmd/play.command";

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

class SlashCommandsModule extends Module {
  private readonly discordRestClient: typeof REST;

  constructor() {
    super();

    this.discordRestClient = new REST({ version: "9" }).setToken(
      config.DISCORD_BOT_TOKEN
    );

    // Repositories
    this.register(new SlashCommandsRepository());
  }

  public deployCommands() {
    const slashCommandsRepository = this.get(SlashCommandsRepository);
    slashCommandsRepository.add([new PlayCommand()]);

    this.discordRestClient
      .put(
        Routes.applicationGuildCommands(
          config.DISCORD_CLIENT_ID,
          config.DISCORD_GUILD_ID
        ),
        { body: slashCommandsRepository.getRawCommands() }
      )
      .then(() => console.log("Successfully registered application commands."))
      .catch((error) => console.error(error));
  }
}

export default (() => {
  const module = new SlashCommandsModule();

  // Deploy slash commands after module init
  module.deployCommands();

  return module;
})();

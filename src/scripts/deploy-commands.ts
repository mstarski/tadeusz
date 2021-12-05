import config from "../utils/config";
import { slashCommands } from "../slash-commands/slash-commands-definitions";

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(config.DISCORD_BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      config.DISCORD_CLIENT_ID,
      config.DISCORD_GUILD_ID
    ),
    { body: slashCommands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

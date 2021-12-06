// Require the necessary discord.js classes
import config from "./utils/config";

// noinspection ES6UnusedImports
import AppModule from "./app.module";

import { SlashCommandsController } from "./slash-commands/slash-commands.controller";
import { HelloController } from "./hello/hello.controller";

const { Client, Intents } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// Create controllers
new HelloController({
  client,
  mode: "once",
  event: "ready",
});

new SlashCommandsController({
  client,
  mode: "on",
  event: "interactionCreate",
});

// Login to Discord with your client's token
void client.login(config.DISCORD_BOT_TOKEN);

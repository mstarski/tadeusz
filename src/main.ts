// Require the necessary discord.js classes
import config from "./utils/config";
import {
  slashCommandRepository,
  slashCommandsController,
} from "./slash-commands";
import { helloController } from "./hello";
import { connectionService } from "./connection";

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

connectionService.setClient(client);
void slashCommandRepository.deploy();

// Create controllers
helloController({
  client,
  mode: "once",
  event: "ready",
});

slashCommandsController({
  client,
  mode: "on",
  event: "interactionCreate",
});

// Login to Discord with your client's token
void client.login(config.DISCORD_BOT_TOKEN);

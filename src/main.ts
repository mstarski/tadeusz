// Require the necessary discord.js classes
import config from "./utils/config";
import { CommandInteraction } from "discord.js";
import { SlashCommandsController } from "./slash-commands/slash-commands-controller";
import { PlayCommand } from "./slash-commands/cmd/play";

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
const slashCommandsController = new SlashCommandsController(new PlayCommand());

// When the client is ready, run this code (only once)
client.once("ready", (client) => {
  console.log(`Tadeusz is ready as ${client.user.tag} uwu.`);
});

client.on(
  "interactionCreate",
  async (interaction: CommandInteraction) =>
    await slashCommandsController.handleInteractions(interaction)
);

// Login to Discord with your client's token
void client.login(config.DISCORD_BOT_TOKEN);

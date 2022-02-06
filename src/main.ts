import config from "./utils/config";
import mongoose from "mongoose";
import { DBConnectionError } from "./errors/db.errors";

const { Client, Intents } = require("discord.js");
const {
  slashCommandRepository,
  slashCommandsController,
} = require("./slash-commands");
const { helloController } = require("./hello");
const { connectionService } = require("./connection");
const { appExit, onKill } = require("./utils/exit");

async function main() {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Successfully conected to MongoDB");
  } catch (err) {
    throw new DBConnectionError(err);
  }

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

  connectionService.client = client;

  await slashCommandRepository.deploy();

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
  await client.login(config.DISCORD_BOT_TOKEN);

  // Exit on error to enable a potential reboot
  process.on("uncaughtException", appExit);
  process.on("unhandledRejection", appExit);
  process.on("SIGINT", onKill);
}

void main();

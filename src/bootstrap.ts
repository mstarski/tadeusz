import { Client, Intents } from "discord.js";
import { config } from "./common/config";
import { ConfigKeys } from "./typedefs/config.types";
import { pipeP } from "ramda";

const Discord = require("discord.js");

const generateDiscordClient = async () =>
  new Discord.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });

const loginToDiscord = async (client: Client) =>
  pipeP(
    (client: Client) => client.login(config(ConfigKeys.DISCORD_BOT_TOKEN)),
    async () => client
  )(client);

export const bootstrap = pipeP<void, Client, Client>(
  generateDiscordClient,
  loginToDiscord
);

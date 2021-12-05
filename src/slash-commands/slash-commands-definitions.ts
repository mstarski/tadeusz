const { SlashCommandBuilder } = require("@discordjs/builders");

export const slashCommands = [
  new SlashCommandBuilder()
    .setName("jebnij")
    .setDescription("Jebnij muzyczką.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Link do muzyczki.")
        .setRequired(true)
    ),
];

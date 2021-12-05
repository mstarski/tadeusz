import { CommandInteraction } from "discord.js";

module.exports = (interaction: CommandInteraction) => {
  console.log(interaction.guildId);
};

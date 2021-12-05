import { CommandInteraction } from "discord.js";

export const interactionsController = async (
  interaction: CommandInteraction
) => {
  const handlers = {
    ping: require("../slash-commands/ping"),
  };

  if (!interaction.isApplicationCommand()) return;
  const { commandName } = interaction;

  return handlers[commandName](interaction);
};

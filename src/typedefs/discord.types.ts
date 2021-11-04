import { Interaction } from "discord.js";

export interface IDiscordCommand {
  name: string;
  args: string[];
  ctx: Interaction;
}

import { CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require("@discordjs/builders");

export interface ISlashCommandOption {
  name: string;
  description: string;
  required: boolean;
}

export abstract class SlashCommand {
  private readonly commandBody: any;

  /**
   * Code executed after command has been typed
   */
  public abstract execute(interaction: CommandInteraction): void;

  protected constructor(
    private readonly name: string,
    private readonly description: string,
    private readonly options: ISlashCommandOption[]
  ) {
    this.commandBody = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    this.options.forEach((option) =>
      this.commandBody.addStringOption((o) =>
        o
          .setName(option.name)
          .setDescription(option.description)
          .setRequired(option.required)
      )
    );
  }

  public get body() {
    return this.commandBody;
  }
}

import { SlashCommand } from "./slash-command";
import { IsClass } from "../typedefs/common";

export class SlashCommandsRepository {
  private readonly commands = new Map();

  public getCommands(): [IsClass<SlashCommand>, SlashCommand][] {
    return Array.from(this.commands);
  }

  public getRawCommands() {
    return this.getCommands().map(([_, value]) => value.body);
  }

  public add(commands: SlashCommand[]): void {
    commands.forEach((command) => {
      this.commands.set(command.constructor, command);
    });
  }

  public findByToken(token: IsClass<SlashCommand>): SlashCommand {
    return this.commands.get(token);
  }

  public findByName(name: string): SlashCommand {
    return this.getCommands().find(([_, value]) => value.body.name === name)[1];
  }

  public remove(token: IsClass<SlashCommand>): boolean {
    return this.commands.delete(token);
  }
}

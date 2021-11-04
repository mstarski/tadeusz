import { parseChatCommand } from "../src/controllers/chat.controller";
import { Interaction } from "discord.js";
import { curry } from "ramda";
import { IDiscordCommand } from "../src/typedefs/discord.types";

describe("Chat functions", () => {
  const mockCtx = {} as Interaction;

  describe("parseChatCommand", () => {
    const parse = curry(parseChatCommand)(mockCtx);

    it("should properly parse messages that start with '!'", () => {
      const validCommand = "!valid";

      const result = parse(validCommand);

      expect(result).toBe({
        name: validCommand,
        args: [],
        ctx: mockCtx,
      } as IDiscordCommand);
    });

    it("should properly parse command's arguments and put it inside 'args' prop of an object", () => {
      const cmd = "!test 1 2 3 abc def";

      const result = parse(cmd);

      expect(result).toBe({
        name: "test",
        args: ["1", "2", "3", "abc", "def"],
        ctx: mockCtx,
      } as IDiscordCommand);
    });

    it("should return null if given wrong format", () => {
      const invalidCommand = "invalid";

      const result = parse(invalidCommand);

      expect(result).toBeNull();
    });
  });
});

import { Message } from "discord.js";

const handlers = {};

export const isChatCommand = (msg: string) => msg.startsWith("!");

const handleChatCommand = (msg: string) => console.log("Message:", msg);

export const chatController = ({ content: msg }: Message) =>
  isChatCommand(msg) ? handleChatCommand(msg) : null;

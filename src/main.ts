import { bootstrap, deploySlashCommands } from "./bootstrap";
import { logger } from "./common/logger";
import { interactionsController } from "./controllers/interactions.controller";
import { CommandInteraction } from "discord.js";

require("dotenv").config();

logger.info("Bootstraping application...");

const main = async () => {
  deploySlashCommands();
  const client = await bootstrap();

  client.on("interactionCreate", (interaction: CommandInteraction) =>
    interactionsController(interaction)
  );
};

void main();

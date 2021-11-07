import { bootstrap, deploySlashCommands } from "./bootstrap";
import { logger } from "./common/logger";
import { chatController } from "./controllers/chat.controller";
import { interactionsController } from "./controllers/interactions.controller";

require("dotenv").config();

logger.info("Bootstraping application...");

const main = async () => {
  deploySlashCommands();
  const client = await bootstrap();

  client.on("messageCreate", (msg) => chatController(msg));

  client.on("interactionCreate", (interaction) =>
    interactionsController(interaction)
  );
};

void main();

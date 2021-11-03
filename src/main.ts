import { bootstrap } from "./bootstrap";
import { isIngame } from "./riot/is-ingame";
require("dotenv").config();

bootstrap()
  .then((client) =>
    client.once("ready", () => console.log(`Logged in as ${client.user.tag}`))
  )
  .then(() => isIngame())
  .then((val) => console.log(val));

import { Telegraf } from "telegraf";
import localStorage from "telegraf-session-local";
import sequelize from "./db/conn.js";
// import logger from "./utils/logger.js";
import subUService from "./services/API/subU.service.js";
import { BotContextI } from "./context/context.interface.js";
import { Command } from "./commands/command.class.js";
import { config } from "./services/config/config.service.js";
import { StartCommand } from "./commands/start.command.js";
import { ConfigServiceI } from "./services/config/config.interface.js";

class Bot {
  bot: Telegraf<BotContextI>;
  commands: Command[] = [];

  constructor(private readonly configService: ConfigServiceI) {
    this.bot = new Telegraf(this.configService.get("BOT_TOKEN") ?? "");
    this.bot.use(new localStorage({ database: "sessions.json" }).middleware());
  }

  async init() {
    await subUService.checkJWT().catch(async (err) => {
      const loginRes = await subUService
        .login()
        .then((loginRes) => {
          if (loginRes.status !== 200) throw new Error("login failed");
          if (loginRes.data.token) config.set("JWT_TOKEN", loginRes.data.token);
        })
        .catch((err) => {});
    });

    this.commands = [new StartCommand(this.bot)];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}

await sequelize.sync({ force: true });
await sequelize.authenticate();

const bot = new Bot(config);
await bot.init();

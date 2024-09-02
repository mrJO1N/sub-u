import { Telegraf } from "telegraf";
import localStorage from "telegraf-session-local";
import sequelize from "./db/conn.js";
import logger from "./utils/logger.js";
import subUService from "./services/API/subU.service.js";
import { BotContextI } from "./context/context.interface.js";
import { Command } from "./commands/command.class.js";
import { config } from "./services/config/config.service.js";
import { StartCommand } from "./commands/start.command.js";
import { DepositActionsCommand } from "./commands/deposit.actions.js";
import { ConfigServiceI } from "./services/config/config.interface.js";
import launchHttpServer from "./utils/emptyHTTP.server.js";

class Bot {
  bot: Telegraf<BotContextI>;
  commands: Command[] = [];

  constructor(private readonly configService: ConfigServiceI) {
    this.bot = new Telegraf(this.configService.get("BOT_TOKEN") ?? "");
    this.bot.use(new localStorage({ database: "sessions.json" }).middleware());
  }

  async init() {
    await subUService.checkJWT().catch(async (errJWT) => {
      const { err, resData: loginResData } = await subUService.login();

      if (err) return logger.error({ data: loginResData, ...err });
      // if (loginResData.token) config.set("JWT_TOKEN", loginResData.token);
    });

    this.commands = [
      new StartCommand(this.bot),
      new DepositActionsCommand(this.bot),
    ];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
    logger.info("Bot started");
  }

  async shutdown() {
    this.bot.stop();
    logger.info("Bot stopped");
    await sequelize.close();
    logger.info("Database connection closed");
    process.exit(0);
  }
}

await sequelize.sync({ force: true });
await sequelize.authenticate();

const bot = new Bot(config);
await bot.init();

process.on("SIGINT", bot.shutdown);
process.on("SIGTERM", bot.shutdown);

//for anti-blocking render.com
await launchHttpServer(Number(config.get("HTTP_PORT") ?? 80));

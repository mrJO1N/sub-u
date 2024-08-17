import { Markup } from "telegraf";
import { Command } from "./command.class.js";
import subUService from "../services/API/subU.service.js";
import logger, { logAllRight, logRunAction } from "../utils/logger.js";

import { models } from "../db/models.js";

export class DepositActionsCommand extends Command {
  handle(): void {
    this.bot.action("deposit 10", async (ctx) => {
      logRunAction(`${ctx.from.first_name} ${ctx.from.last_name} deposit10`);

      const user = ctx.session.userModelAttr;

      if (!user) return ctx.reply("bad user");

      ctx.editMessageText(
        "You deposited 10 subers to your balance",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10 new"),
        ])
      );

      await subUService.deposit10(user.name);

      logAllRight(`${ctx.from.first_name} ${ctx.from.last_name}`);
    });

    this.bot.action("deposit 10 new", async (ctx) => {
      logRunAction(`${ctx.from.first_name} ${ctx.from.last_name} deposit10new`);

      const user = ctx.session.userModelAttr;
      if (!user)
        return logger.error(
          `${ctx.from.first_name} ${ctx.from.last_name} !> bad user`
        );

      ctx.editMessageText("+10 subers on your balance");

      ctx.reply(
        "You can deposited 10 subers to your balance every day",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10 new"),
        ])
      );

      await subUService.deposit10(user.name);
      logAllRight(`${ctx.from.first_name} ${ctx.from.last_name}`);
    });
  }
}

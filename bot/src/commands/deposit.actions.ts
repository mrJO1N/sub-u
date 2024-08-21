import { Markup } from "telegraf";
import { Command } from "./command.class.js";
import subUService from "../services/API/subU.service.js";
import logger, { logAllRight, logRunAction } from "../utils/logger.js";

import { models } from "../db/models.js";
import { BotContextI } from "../context/context.interface.js";
import { ApiError } from "../errors/API.error.js";

export class DepositActionsCommand extends Command {
  protected async runRequest(ctx: BotContextI) {
    const user = ctx.session.userModelAttr;
    let error: Error | undefined;
    if (!user) return { err: ApiError.internal("bad user") };

    const { err } = await subUService.deposit10(user.name);
    if (err) {
      ctx.reply("try again later");
      error = err;
    }

    return { err: error };
  }
  handle(): void {
    this.bot.action("deposit 10", async (ctx) => {
      logRunAction(`${ctx.from.first_name} ${ctx.from.last_name} deposit10`);

      const { err } = await this.runRequest(ctx);
      if (err)
        return logger.error(
          `${ctx.from?.first_name} ${ctx.from?.last_name} !> error`,
          err
        );

      ctx.editMessageText(
        "You deposited 10 subers to your balance",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10 new"),
        ])
      );

      logAllRight(`${ctx.from.first_name} ${ctx.from.last_name}`);
    });

    this.bot.action("deposit 10 new", async (ctx) => {
      logRunAction(`${ctx.from.first_name} ${ctx.from.last_name} deposit10new`);

      const { err } = await this.runRequest(ctx);
      if (err)
        return logger.error(
          `${ctx.from?.first_name} ${ctx.from?.last_name} !> error`,
          err
        );

      ctx.editMessageText("+10 subers on your balance");
      ctx.reply(
        "You can deposited 10 subers to your balance every day",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10 new"),
        ])
      );

      logAllRight(`${ctx.from.first_name} ${ctx.from.last_name}`);
    });
  }
}

import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Command } from "./command.class.js";
import { BotContextI } from "../context/context.interface.js";
import subUService from "../services/API/subU.service.js";

import { models } from "../db/models.js";

export class StartCommand extends Command {
  constructor(bot: Telegraf<BotContextI>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        "Hello!  I'm a subU bot. I will help you deposit subers to your balance in the subU system, " +
          "\nsay your subU username to continue:"
        // Markup.inlineKeyboard([
        //   Markup.button.callback("deposit 10", "deposit 10"),
        // ])
      );
    });
    this.bot.on(message("text"), async (ctx) => {
      const user = await models.User.create({
        tgId: ctx.from.id,
        name: ctx.message.text,
      });

      await ctx.reply(
        `ok. lets continue, ${user.dataValues.name}!` +
          "you can make deposit everyday per 10 subers",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10"),
        ])
      );
    });

    this.bot.action("deposit 10", async (ctx) => {
      const user = await models.User.findOne({ where: { tgId: ctx.from.id } });

      if (!user) return ctx.reply("bad user");

      ctx.reply(
        "You deposited 10 subers to your balance (" +
          JSON.stringify(
            (await subUService.deposit10(user?.dataValues.name)).data
          ) +
          ")"
      );
    });
  }
}

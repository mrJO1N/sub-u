import { Markup } from "telegraf";
import { message } from "telegraf/filters";
import { Command } from "./command.class.js";

import { models } from "../db/models.js";
import logger from "../utils/logger.js";

export class StartCommand extends Command {
  handle(): void {
    this.bot.start(async (ctx) => {
      logger.info(`${ctx.from.first_name} ${ctx.from.last_name} -> /start`);

      const userCandidateDatavalues = (await models.User.findByPk(ctx.from.id))
        ?.dataValues;

      if (userCandidateDatavalues)
        ctx.session.userModelAttr = userCandidateDatavalues;

      let myInlineKeyboard;

      if (ctx.session.userModelAttr)
        myInlineKeyboard = Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10 new"),
        ]);

      ctx.reply(
        "Hello! I'm a subU bot. \nI will help you deposit subers to your balance in the subU system",
        myInlineKeyboard
      );

      if (!ctx.session.userModelAttr)
        ctx.reply("say your subU username to continue:");
    });

    // this.bot.on(message("text"), async (ctx) => {
    this.bot.hears(/\w/, async (ctx) => {
      if (ctx.session.userModelAttr) return;

      ctx.session.userModelAttr = (
        await models.User.create({
          tgId: ctx.from.id,
          name: ctx.message.text,
        })
      ).dataValues;

      await ctx.reply(
        `ok. lets continue, ${ctx.session.userModelAttr?.name}! ` +
          "you can make deposit everyday per 10 subers",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10"),
        ])
      );
    });
  }
}

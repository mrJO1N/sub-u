import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class.js";
import { BotContextI } from "../context/context.interface.js";
import subUService from "../services/API/subU.service.js";

export class StartCommand extends Command {
  constructor(bot: Telegraf<BotContextI>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) =>
      ctx.reply(
        "Welcome to the subUbot! \nin this bot you can deposit subers to you balance in subU system",
        Markup.inlineKeyboard([
          Markup.button.callback("deposit 10", "deposit 10"),
        ])
      )
    );

    this.bot.action("deposit 10", async (ctx) => {
      ctx.reply(
        "You deposited 10 subers to your balance (" +
          JSON.stringify((await subUService.deposit10()).data) +
          ")"
      );
    });
  }
}

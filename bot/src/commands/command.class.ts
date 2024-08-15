import { Telegraf } from "telegraf";
import { BotContextI } from "../context/context.interface.js";

export abstract class Command {
  constructor(public bot: Telegraf<BotContextI>) {}

  abstract handle(): void;
}

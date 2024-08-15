import { Context } from "telegraf";

export interface SessionDataI {}

export interface BotContextI extends Context {
  session: SessionDataI;
}

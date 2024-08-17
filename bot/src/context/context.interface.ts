import { Context } from "telegraf";
import { UserAttrI } from "../db/models.js";

export interface SessionDataI {
  userModelAttr?: UserAttrI;
}

export interface BotContextI extends Context {
  session: SessionDataI;
}

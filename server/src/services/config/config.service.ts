import { ConfigServiceI } from "./config.interface.js";
import dotenv, { config as dotenvConfig, DotenvParseOutput } from "dotenv";

class ConfigService implements ConfigServiceI {
  private config: IConfig = {};

  constructor() {
    try {
      dotenv.config();
      for (const key in process.env) {
        this.config[key] = process.env[key] ?? "";
      }
    } catch (err) {
      throw err;
    }
  }

  get(key: string) {
    const res = this.config[key];

    if (res) return res;
  }

  set(key: string, value: string) {
    this.config[key] = value;
  }
}

interface IConfig {
  [key: string]: string;
}

export const config = new ConfigService();

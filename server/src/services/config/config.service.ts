import { ConfigServiceI } from "./config.interface.js";
import dotenv, { config as dotenvConfig, DotenvParseOutput } from "dotenv";

class ConfigService implements ConfigServiceI {
  private config: IConfig;

  constructor() {
    try {
      const { error, parsed: parsedConfig } = dotenvConfig();
      if (error) throw error;
      if (!parsedConfig) throw new Error(".env is empty");
      this.config = parsedConfig;
    } catch (err) {
      dotenv.config();
      for (const key of Object(process.env).keys()) {
        this.config[key] = process.env[key] ?? "";
      }
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

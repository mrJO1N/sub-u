import { ConfigServiceI } from "./config.interface.js";
import { config as dotenvConfig, DotenvParseOutput } from "dotenv";

class ConfigService implements ConfigServiceI {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed: parsedConfig } = dotenvConfig();

    if (error) throw error;
    if (!parsedConfig) throw new Error(".env is empty");

    this.config = parsedConfig;
  }

  get(key: string): string {
    const res = this.config[key];

    if (!res) throw new Error(`Key "${key}" not found in.env`);
    return res;
  }

  set(key: string, value: string) {
    this.config[key] = value;
  }
}

export const config = new ConfigService();

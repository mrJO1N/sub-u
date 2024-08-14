import { config, DotenvParseOutput } from "dotenv";
import { ConfigServiceI } from "./config.interface";

export class ConfigService implements ConfigServiceI {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) throw error;
    if (!parsed) throw new Error(".env is empty");

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];

    if (!res) {
      throw new Error(`Key "${key}" not found in.env`);
    }

    return res;
  }
}

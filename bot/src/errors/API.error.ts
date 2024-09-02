import logger from "../utils/logger.js";

export class ApiError extends Error {
  status: number;
  options?: IApiErrorOptions;
  constructor(status: number, message: string, options?: IApiErrorOptions) {
    super();
    this.message = message;
    this.status = status;
    this.options = options;
  }

  static internal(message: string) {
    logger.error("api error 500 - " + message);
    return new ApiError(500, message);
  }
}

interface IApiErrorOptions {
  method: string;
  url: string;
  data: object;
  Authorization: string;
}

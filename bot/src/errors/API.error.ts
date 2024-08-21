import logger from "../utils/logger.js";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static internal(message: string) {
    logger.error("api error 500 - " + message);
    return new ApiError(500, message);
  }
}

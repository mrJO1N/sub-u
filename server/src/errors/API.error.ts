import logger from "../utils/logger";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static badRequest(message: string) {
    logger.error("api error 400 - " + message);
    return new ApiError(400, message);
  }
  static internal(message: string) {
    logger.error("api error 500 - " + message);
    return new ApiError(500, message);
  }
  static forBidden(message: string) {
    logger.error("api error 403 - " + message);
    return new ApiError(403, message);
  }
}

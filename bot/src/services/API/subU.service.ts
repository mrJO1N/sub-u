import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config.service.js";
import { ApiError } from "../../errors/API.error.js";
import logger from "../../utils/logger.js";

const axiosInstance = axios.create({
  baseURL: config.get("SUBU_URL"),
  timeout: 1000 * 30,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

const catchHandler = (err: AxiosError) => {
  let error: AxiosError | object | undefined;
  const { stack: _stack, ..._err } = err.toJSON() as AxiosError;

  if (_err.config) {
    error = {
      method: _err.config.method,
      url: _err.config.url,
      reqData: _err.config.data,
      resData: _err.response?.data,
      code: _err.code,
      resStatus: _err.response?.status,
      headers: _err.config.headers,
    };
  } else error = _err;

  return error;
};

export const deposit10 = async (toUsername: string) => {
  let error: AxiosError | object | undefined, resData;

  resData = await axiosInstance
    .post(
      config.get("SUBU_URL") + "/api/deposit/10",
      { toUser: toUsername },
      {
        headers: { Authorization: `user ${config.get("JWT_TOKEN")}` },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      error = catchHandler(err);
    });

  return { err: error, resData };
};

export const checkJWT = async () => {
  return await axios.get(`${config.get("SUBU_URL")}/api/users/auth`);
};

export const login = async () => {
  let error: AxiosError | object | undefined, resData;

  let res = await axiosInstance
    .post(`${config.get("SUBU_URL")}/api/users/login`, {
      name: config.get("LOGIN_USERNAME"),
      password: config.get("LOGIN_PASSWORD"),
    })
    .then((res) => res.data)
    .catch((err) => {
      error = catchHandler(err);
    });

  return { err: error, resData };
};

export default { deposit10, checkJWT, login };

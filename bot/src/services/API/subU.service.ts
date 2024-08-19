import axios from "axios";
import { config } from "../config/config.service.js";

export const deposit10 = async (toUsername: string) => {
  let resData: {} = {};
  try {
    resData = await axios
      .post(
        `${config.get("SUBU_URL")}/api/deposit/10`,
        { toUser: toUsername },
        {
          headers: { Authorization: `user ${config.get("JWT_TOKEN")}` },
        }
      )
      .then((res) => res.data);
  } finally {
    return resData;
  }
};

export const checkJWT = async () => {
  return await axios.get(`${config.get("SUBU_URL")}/api/users/auth`);
};

export const login = async () => {
  return await axios.post(`${config.get("SUBU_URL")}/api/users/login`, {
    name: config.get("LOGIN_USERNAME"),
    password: config.get("LOGIN_PASSWORD"),
  });
};

export default { deposit10, checkJWT, login };

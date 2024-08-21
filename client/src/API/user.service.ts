import React, { useContext } from "react";
import axios from "axios";
import prodConfig from "../config/prod.config.json";
import devConfig from "../config/dev.config.json";
import { AuthContext } from "../context/AuthContext";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export async function userReg(
  username: string,
  email: string,
  password: string
) {
  let data: resData = {},
    err: Error | undefined;

  data = await axios
    .post(`${config.SERVER_HOST_URL}/api/users/reg`, {
      email,
      password,
      name: username,
    })
    .then((res) => res?.data)
    .catch((error) => {
      err = error;
    });

  return { data, err };
}
export async function userLogin(name: string, password: string) {
  let data: resData = {};
  try {
    data = await axios
      .post(`${config.SERVER_HOST_URL}/api/users/login`, { name, password })
      .then((res) => res?.data);
  } finally {
    return data;
  }
}

export async function checkToken(userToken: string) {
  let data: resData = {},
    err: Error | undefined;

  data = await axios
    .get(`${config.SERVER_HOST_URL}/api/users/auth`, {
      headers: { Authorization: "test " + userToken },
    })
    .then((res) => res?.data)
    .catch((error) => {
      err = error;
    });

  return { err, data };
}

export async function getBalance(userToken: string) {
  let balance: number | undefined = 0,
    err: Error | undefined;

  balance = await axios
    .get(`${config.SERVER_HOST_URL}/api/users/balance`, {
      headers: { Authorization: "test " + userToken },
    })
    .then((res) => res?.data.balance)
    .catch((error) => {
      err = error;
    });
  return { err, balance };
}

interface resData {
  token?: string;
  message?: string;
}

export default { checkToken, userLogin, userReg, getBalance };

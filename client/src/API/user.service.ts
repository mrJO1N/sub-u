import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SERVER_HOST_URL =
  process.env.NODE_ENV === "production"
    ? "https://sub-u.onrender.com"
    : "http://localhost:8000";

export async function userReg(
  username: string,
  email: string,
  password: string
) {
  let data: resData = {};
  try {
    data = await axios
      .post(`${SERVER_HOST_URL}/api/users/reg`, {
        email,
        password,
        name: username,
      })
      .then((res) => res?.data);
  } finally {
    return data;
  }
}
export async function userLogin(email: string, password: string) {
  let data: resData = {};
  try {
    data = await axios
      .post(`${SERVER_HOST_URL}/api/users/login`, { email, password })
      .then((res) => res?.data);
  } finally {
    return data;
  }
}

export async function checkToken(userToken: string) {
  let data: resData = {};
  try {
    data = await axios
      .get(`${SERVER_HOST_URL}/api/users/auth`, {
        headers: { Authorization: "test " + userToken },
      })
      .then((res) => res?.data);
  } finally {
    return data;
  }
}

export async function getBalance(userToken: string) {
  let balance: number | undefined = 0;
  try {
    balance = await axios
      .get(`${SERVER_HOST_URL}/api/users/balance`, {
        headers: { Authorization: "test " + userToken },
      })
      .then((res) => res?.data.balance);
  } finally {
    return balance;
  }
}

interface resData {
  token?: string;
  message?: string;
}

export default { checkToken, userLogin, userReg, getBalance };

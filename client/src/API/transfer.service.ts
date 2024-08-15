import React, { useContext } from "react";
import axios from "axios";
import prodConfig from "../config/prod.config.json";
import devConfig from "../config/dev.config.json";
import { AuthContext } from "../context/AuthContext";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export async function makeTransfer(
  username: string,
  amount: string,
  userToken: string
) {
  let data: resData = {};
  try {
    data = await axios
      .post(
        `${config.SERVER_HOST_URL}/api/transfers/make-to`,
        {
          username,
          amount,
        },
        { headers: { Authorization: `servi.mt ${userToken}` } }
      )
      .then((res) => res?.data);
  } finally {
    return data;
  }
}
interface resData {
  message?: string;
}

export default { makeTransfer };

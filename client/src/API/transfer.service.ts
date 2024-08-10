import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SERVER_HOST_URL =
  process.env.NODE_ENV === "production"
    ? "https://sub-u.onrender.com"
    : "http://localhost:8000";

export async function makeTransfer(
  username: string,
  amount: string,
  userToken: string
) {
  let data: resData = {};
  try {
    data = await axios
      .post(
        `${SERVER_HOST_URL}/api/transfers/make-to`,
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

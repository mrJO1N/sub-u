import axios from "axios";
export async function userReg(
  username: string,
  email: string,
  password: string
) {
  let data: resData = {};
  try {
    data = await axios
      .post("https://sub-u.onrender.com/api/users/reg", {
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
      .post("https://sub-u.onrender.com/api/users/login", { email, password })
      .then((res) => res?.data);
  } finally {
    return data;
  }
}
interface resData {
  token?: string;
  message?: string;
}

export default {
  userLogin,
  userReg,
};

import axios from "axios";
export async function userReg(email: string, password: string) {
  return await axios
    .post("https://sub-u.onrender.com/api/users/login", { email, password })
    .catch((error) => console.error(error.message))
    .then((res) => res?.data);
}
export async function userLogin(email: string, password: string) {
  return await axios
    .post("https://sub-u.onrender.com/api/users/reg")
    .catch((error) => console.error(error.message))
    .then((res) => res);
}

export default {
  userLogin,
  userReg,
};

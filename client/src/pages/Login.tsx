import React, { useContext, useState } from "react";
import Joi from "joi";
import userService from "../API/user.service";
import { UI } from "../components/UI/main";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { setUserToken, setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const formDataSchema = Joi.object({
    email: Joi.string().email({ tlds: false }),
    password: Joi.string().min(5),
  });

  const submitHandler = () => {
    const { error } = formDataSchema.validate(formData, { abortEarly: false });
    if (error) return setError(error.message);

    userService.userLogin(formData.email, formData.password).then((resData) => {
      if (resData.message) return console.error(resData.message);
      if (resData.token) {
        localStorage.setItem("token", resData.token);
        if (setUserToken) setUserToken(resData.token);
        if (setIsAuth) setIsAuth(true);
      }
      navigate("/");
    });
  };

  return (
    <div className="Home-page">
      {error && (
        <UI.Alert
          name="form rrror"
          message={error ?? ""}
          className="active"
          setError={setError}
        />
      )}
      <UI.Modal name="login" className="active">
        <UI.Input
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <UI.Input
          placeholder="password"
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <span>
          or <Link to="/reg">register</Link>
        </span>
        <UI.Button onClick={submitHandler}>enter</UI.Button>
      </UI.Modal>
    </div>
  );
}

export default Login;

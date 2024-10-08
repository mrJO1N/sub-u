import React, { useState, useContext } from "react";
import Joi from "joi";
import { AuthContext } from "../context/AuthContext";
import userService from "../API/user.service";
import { UI } from "../components/UI/main";
import { Link, useNavigate } from "react-router-dom";

function Reg() {
  const { setUserToken, setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  const [error, setError] = useState<string | null>(null);

  const formDataSchema = Joi.object({
    email: Joi.string().email({ tlds: false }),
    password: Joi.string().min(5),
    password2: Joi.string().min(5).valid(Joi.ref("password")),
    username: Joi.string().alphanum().min(3),
  });

  const submitHandler = async () => {
    const { error } = formDataSchema.validate(formData, { abortEarly: false });
    if (error) return setError(error.message);

    const { data: resData } = await userService.userReg(
      formData.username,
      formData.email,
      formData.password
    );

    if (resData.message) {
      console.error(resData.message);
    }

    if (resData.token) {
      localStorage.setItem("token", resData.token);
      if (setUserToken) setUserToken(resData.token);
      if (setIsAuth) setIsAuth(true);
      navigate("/");
    }
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
      <UI.Modal name="register" className="active">
        <UI.Input
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <UI.Input
          placeholder="name"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <UI.Input
          placeholder="password"
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <UI.Input
          placeholder="password"
          type="text"
          value={formData.password2}
          onChange={(e) =>
            setFormData({ ...formData, password2: e.target.value })
          }
        />
        <span>
          or <Link to="/login">login</Link>
        </span>
        <UI.Button onClick={submitHandler}>enter</UI.Button>
      </UI.Modal>
    </div>
  );
}

export default Reg;

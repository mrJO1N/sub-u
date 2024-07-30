import React, { useState } from "react";
import Joi from "joi";
import userService from "../API/user.service";
import Header from "../components/Header";
import { UI } from "../components/UI/main";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const formDataSchema = Joi.object({
    email: Joi.string().email({ tlds: false }),
    password: Joi.string().min(5),
  });

  const submitHandler = () => {
    const { error } = formDataSchema.validate(formData, { abortEarly: false });
    if (error) return setError(error.message);

    userService.userLogin(formData.email, formData.password).then((data) => {
      console.warn(data);
    });
  };

  return (
    <div className="Home-page">
      <Header
        menuList={[
          { url: "/login", label: "sigh in" },
          { url: "/i", label: "transfer" },
        ]}
      />
      {/* <UI.Alert name="form error" message={"mega"} className="active" /> */}
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
        <UI.Button onClick={submitHandler}>enter</UI.Button>
      </UI.Modal>
    </div>
  );
}

export default Login;

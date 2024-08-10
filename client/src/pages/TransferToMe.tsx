import React, { useContext, useState } from "react";
import Joi from "joi";
import transfersService from "../API/transfer.service";
import { UI } from "../components/UI/main";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", amount: "" });
  const [error, setError] = useState<string | null>(null);

  const formDataSchema = Joi.object({
    username: Joi.string().alphanum().min(3),
    amount: Joi.number().integer().min(10),
  });

  const submitHandler = () => {
    const { error } = formDataSchema.validate(formData, { abortEarly: false });
    if (error) return setError(error.message);

    transfersService
      .makeTransfer(formData.username, formData.amount, userToken ?? "")
      .then((data) => {
        if (data.message) return console.error(data.message);
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
      <UI.Modal name="transfer" className="active">
        <UI.Input
          placeholder="username"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <UI.Input
          placeholder="amount"
          type="text"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {/* <span>
          or <Link to="/reg">register</Link>
        </span> */}
        <UI.Button onClick={submitHandler}>enter</UI.Button>
      </UI.Modal>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/actions";
import { logInApi } from "../../api/backApi";
import "./style.scss";

function LogIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  function changeInputValue({ target: { name, value } }) {
    setInputs({ ...inputs, [name]: value });
  }
  function logIn(e) {
    e.preventDefault();
    dispatch(auth(logInApi(inputs)));
  }

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);
  return (
    <>
      <div className="row justify-content-center">
        <h2>Войти</h2>
      </div>
      <div className="row justify-content-center">
        <form onSubmit={logIn} className="login_form">
          <label>
            Почта
            <input
              required
              className="form-control form-control-sm"
              type="text"
              name="email"
              onChange={(e) => changeInputValue(e)}
              value={email}
            />
          </label>
          <label>
            Пароль
            <input
              required
              className="form-control form-control-sm"
              type="password"
              name="password"
              onChange={(e) => changeInputValue(e)}
              value={password}
            />
          </label>
          <button className="btn btn-primary btn-sm" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default LogIn;

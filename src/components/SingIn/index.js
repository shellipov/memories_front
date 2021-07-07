import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/actions";
import { singInApi } from "../../api/backApi";
import "./style.scss";

function SingIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const iaAuth = useSelector((state) => state.auth.isAuth);
  const error = useSelector((state) => state.auth.error);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    check_password: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState("");

  const { email, password, check_password, first_name, last_name } = inputs;

  function changeInputValue({ target: { name, value } }) {
    setError("");
    setInputs({ ...inputs, [name]: value });
  }
  function singIn(e) {
    e.preventDefault();
    if (password === check_password) {
      dispatch(auth(singInApi(inputs)));
    } else {
      setError("Пароли не совпадают");
    }
  }

  useEffect(() => {
    if (iaAuth) {
      history.push("/");
    }
  }, [iaAuth, history]);

  return (
    <>
      <div className="row justify-content-center">
        <h2>Зарегистрироваться</h2>
      </div>
      <div className="row justify-content-center">
        <form onSubmit={singIn} className="login_form">
          <div>{error && <div className="login_page_error">{error}</div>}</div>
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
          <label>
            Повторите пароль
            <input
              required
              className="form-control form-control-sm"
              type="password"
              name="check_password"
              onChange={(e) => changeInputValue(e)}
              value={check_password}
            />
          </label>
          <label>
            Имя
            <input
              required
              className="form-control form-control-sm"
              type="text"
              name="first_name"
              onChange={(e) => changeInputValue(e)}
              value={first_name}
            />
          </label>
          <label>
            Фамилия
            <input
              required
              className="form-control form-control-sm"
              type="text"
              name="last_name"
              onChange={(e) => changeInputValue(e)}
              value={last_name}
            />
          </label>
          <div>{error}</div>
          <button className="btn btn-primary btn-sm" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}

export default SingIn;

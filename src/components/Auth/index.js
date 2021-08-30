import React, { useState } from "react";
import { useSelector} from "react-redux";
import StartPhotos from "../StartPhotos";
import LogIn from "../LogIn";
import SingIn from "../SingIn";
import "./style.scss";

function Auth() {
  const [loginVisible, setLoginVisible] = useState(true);
  const error = useSelector((state) => state.auth.error)
  const buttonName = loginVisible ? "Зарегистрироваться" : "Войти";
  return (
    <>
      <div style={{ paddingTop: '60px'}} className="row">
        <div className="col-md-6">
          <button
            className="btn btn-link btn-sm"
            onClick={() => setLoginVisible(!loginVisible)}
          >
            {buttonName}
          </button>

          {loginVisible ? (
            <>
              <LogIn />
            </>
          ) : (
            <>
              <SingIn />
            </>
          )}
          <div>
            {error}
          </div>
        </div>
        <div className="col-md-6">
          <StartPhotos />
        </div>
      </div>
    </>
  );
}

export default Auth;

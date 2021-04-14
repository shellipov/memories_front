import React, { useEffect } from "react";
import { Route, Link, useHistory} from "react-router-dom";
import Loading from "../Functions/Loading";
import Error from "../Functions/Error";
import { useSelector } from "react-redux";
import "./style.scss";

function Header() {
  const history = useHistory();
  const iaAuth = useSelector((state) => state.auth.isAuth);


  useEffect(() => {
    if (!iaAuth) {
      history.push("/auth");
    }
  }, [iaAuth, history]);

  return (
    <header>
      <div className="row align-items-center">
        <div className="col lg-5">
          <div className="title">Memories</div>
        </div>
        <div className="col lg-2">
          {/* <Loading /> */}
          <Error />
        </div>
        <div className="col lg-5 button-block">
          <div id="row justify-content-center"></div>
          <Route exact path="/">
            <Link
              className="btn btn-outline-light btn-sm header_botton"
              to="/profile"
            >
              Профиль
            </Link>
          </Route>
          <Route exact path="/edit_event:id">
            <Link className="btn btn-outline-light btn-sm header_botton" to="/">
              Назад
            </Link>
          </Route>
          <Route exact path="/profile">
            <Link className="btn btn-outline-light btn-sm header_botton" to="/">
              Назад
            </Link>
          </Route>
        </div>
      </div>
    </header>
  );
}

export default Header;

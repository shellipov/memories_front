import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/actions";
import "./style.scss";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const userPost = localStorage.getItem('email')

  function exit() {
    dispatch(logout());
  }

  useEffect(() => {
    if (!isAuth) {
      history.push("/auth");
    }
  }, [isAuth, history]);

  return (
    <>
      <div className="row">
        <h2>Профиль</h2>
      </div>
      <div className="row">
        {loading && <p>loading</p>}
        {error && <p>{error}</p>}
      </div>
      <div style={{margin: '2rem'}} className="row">
        <span style={{color: 'white'}}>Ну собственно пока все что вы можете, так это унать свою почту - {userPost}  и  <button style={{margin: '2rem 0'}} onClick={exit} className="btn btn-primary btn-sm">
          Выйти
        </button></span>
        
      </div>
    </>
  );
}

export default Profile;

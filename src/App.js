import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import MainPage from "./components/MainPage";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import GetGeo from "./components/GetGeo";
import Footer from "./components/Footer";
import Event from "./components/Event";
import OnePhotoPage from "./components/OnePhotoPage";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { check } from "./api/backApi";
import { successAuth } from "./redux/actions";
import Loading from "./components/Functions/Loading";
import "./styles/main.scss";
function App() {
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(successAuth(data));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading_page">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <GetGeo />
      <Header />
      <Route exact path="/" component={MainPage} />

      <section className="container">
        <Switch>
          <Route exact path="/event:id" component={Event} />
          <Route exact path="/photo:id" component={OnePhotoPage} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/profile" component={Profile} />
          {isAuth ? (
            <>
              <Redirect to={"/"} />
            </>
          ) : (
            <>
              <Redirect to={"/auth"} />
            </>
          )}
        </Switch>
      </section>
      <Footer />
    </Router>
  );
}

export default App;

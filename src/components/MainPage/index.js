import React, { useEffect } from "react";
import Map from "../Map";
import EventsList from "../EventsList";
import EventInfo from "../EventInfo";
import Search from "../Map/Parts/Search";
import CreateEvent from "../CreateEvent";
import Info from "../Info";
import { loadEvents } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./style.scss";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <>
      <div className="main_page">
        <Map className="map"></Map>
        <div className="block block1">
          <div className="content">
            <EventsList />
          </div>
        </div>
        <div className="search">
          <Search />
        </div>
        <div className="block block3">
          <div className="content">
            <EventInfo />
            <CreateEvent />
            <Info />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;

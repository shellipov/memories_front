import React, {useEffect} from "react";
import Map from "../Map";
import EventsList from "../EventsList";
import EventInfo from "../EventInfo";
import CreateEvent from '../CreateEvent';
import { loadEvents } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./style.scss";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <section>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row justify-content-center align-items-center map-window">
            <Map />
            <EventInfo />
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <EventsList />
          </div>
        </div>
      </div>
      <CreateEvent/>
    </section>
  );
}

export default MainPage;

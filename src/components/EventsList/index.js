import React from "react";
import { useSelector } from "react-redux";
import EventCard from '../EventCard'
import "./style.scss";

function EventList() {
  const events = useSelector((state) => state.events.events);

  return (
    <>
      <div className="events_list animate__animated animate__zoomIn">
        <h3>Мои события:</h3>
        {/* <div>
          <button className="btn btn-sm">Сортировать</button>{' '}
          <button className="btn btn-sm">Фильтр</button>
        </div> */}
        {events.map(event => {
          return <div key={event._id}>
            < EventCard event={event}/>
          </div>;
        })}
      </div>
    </>
  );
}

export default EventList;

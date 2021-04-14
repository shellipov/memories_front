import React from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentEvent, tryDeleteEvent } from "../../../redux/actions";
import { Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faAlignLeft,
  faCalendarAlt,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { greenIcon, bigGreenIcon } from "../../Functions/markerIcons";

function AllMarkers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector((state) => state.events.events);
  const currentEvent = useSelector((state) => state.events.currentEvent);

  function openEvent(id) {
    history.push(`/event${id}`);
  }

  return (
    <>
    {events[0] && 
    
  events.map((el) => (
    <Marker
      icon={el._id === currentEvent ? bigGreenIcon : greenIcon}
      zIndexOffset={el._id === currentEvent && 1000000}
      key={el._id}
      position={el.position}
      eventHandlers={{
        click: () => {
          dispatch(setCurrentEvent(el._id));
        },
      }}
    >
      <Popup>
        <b>{el.title}</b>
        <br />
        <FontAwesomeIcon icon={faAlignLeft} /> {el.description}
        <br />
        <FontAwesomeIcon icon={faMapMarker} /> {el.place_name}
        <br />
        <FontAwesomeIcon icon={faLocationArrow} /> {el.address}
        <br />
        <FontAwesomeIcon icon={faCalendarAlt} /> {el.date}
        <br />
        <button
          onClick={() => openEvent(el._id)}
          className="btn btn-success btn-sm "
        >
          Открыть
        </button>
        {"   "}
        <button
          className="btn btn-danger btn-sm "
          onClick={() => {
            dispatch(tryDeleteEvent(el._id))
          }}
        >
          Удалить
        </button>
      </Popup>
    </Marker>
  ))
    }
    </>
  )
}

export default AllMarkers;

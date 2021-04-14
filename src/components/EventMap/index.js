import React from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "./style.scss";

function EventMap({ lat, lng }) {
  function ToPosition() {
    const position = useSelector((state) => state.events.event.position);
    const map = useMap();
    map.flyTo(position, map.getZoom());
    return <> </>;
  }

  return (
    <>
      {lat && lng && (
        <MapContainer
          id="event_map"
          className="animate__animated animate__zoomIn"
          center={{ lat, lng }}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={{ lat, lng }} />
          <ToPosition />
        </MapContainer>
      )}
    </>
  );
}

export default EventMap;

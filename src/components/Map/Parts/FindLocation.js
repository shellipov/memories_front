import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function FindLocation() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Ты тут</Popup>
    </Marker>
  );
}

export default FindLocation;

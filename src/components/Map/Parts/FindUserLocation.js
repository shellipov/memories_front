import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";

function FindUserLocation() {
  const position = useSelector((state) => state.main.userPosition);

  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position);
      // map.locate();
    }
  }, [map, position]);
  return position === null ? null : (
    <Marker position={position}>
      <Popup>Ты тут</Popup>
    </Marker>
  );
}

export default FindUserLocation;

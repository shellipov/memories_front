import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Marker, useMap } from "react-leaflet";

function FindLocation() {
  const map = useMap();
  const position = useSelector((state) => state.main.searchPosition);
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : <Marker position={position}></Marker>;
}

export default FindLocation;

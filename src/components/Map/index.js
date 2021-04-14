import React from "react";
import {useSelector} from "react-redux";
import { MapContainer, TileLayer} from "react-leaflet";
import NewMarker from "./Parts/NewMarker";
import AllMarkers from "./Parts/AllMarkers";
import ToSelectEvent from "./Parts/ToSelectEvent";
import SearchPoint from "./Parts/SearchPoint";
// import FindUserLocation from "./Parts/FindUserLocation";

// import Layers from "./Parts/Layers";
// import FindLocation from "./Parts/FindLocation";
// import NewManyMarkers from "./Parts/NewManyMarkers";


import "./style.scss";

function Map() {
  const position = useSelector((state) => state.main.userPosition);
  const currentEvent = useSelector((state) => state.events.event);
  return (
    <>
      <MapContainer
        id="map"
        className="map animate__animated animate__zoomIn"
        center={ currentEvent ? currentEvent.position : position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <NewMarker />
        <AllMarkers />
        <ToSelectEvent />
        <SearchPoint />
        {/* {isFindMeVisible && <FindLocation />} */}
        {/* <Layers /> */}
        {/* <FindUserLocation/> */}
      </MapContainer>

    </>
  );
}

export default Map;

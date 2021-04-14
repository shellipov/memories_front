import React from "react";
import { useSelector } from "react-redux";
import { useMapEvents } from "react-leaflet";

function ToSelectEvent() {
  const currentEvent = useSelector((state) => state.events.currentEvent);
  const events = useSelector((state) => state.events.events);

  const map = useMapEvents({
    click() {
      if (currentEvent && currentEvent) {
        const event = events.filter((event) => event._id === currentEvent)[0]
        if(event){
          const position = event.position;
          map.flyTo(position, map.getZoom(), {
            animate: true,
            duration: .5
          });
        }
      }
    },
  });

  return <></>;
}

export default ToSelectEvent;

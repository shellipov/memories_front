import React from "react";
import EventData from "./Parts/EventData";
import EventPhoto from "./Parts/EventPhoto";

import "./style.scss";
function Event() {
  return (
    <>
      <div  className='event_page animate__animated animate__zoomIn col'>
        <EventData style={{'margin-top': '6rem'}}/>
        <EventPhoto />
      </div>
    </> 
  );
}

export default Event;

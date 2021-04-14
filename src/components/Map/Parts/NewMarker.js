import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCoordinates} from '../../../redux/actions'
import {
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

  function NewMarker() {
    const dispatch = useDispatch()
    const position = useSelector((state)=> state.events.currentCoordinates)
    const [popups, setPopups] = useState([]);

    const map = useMapEvents({
      contextmenu(e) {
        map.locate();
        setPopups([...popups, e.latlng]);
        dispatch(setCurrentCoordinates(null))
        dispatch(setCurrentCoordinates(e.latlng))
      },
    });

    return position === null ? null : (
      
      <Marker position={position} eventHandlers={{
        click: () => {
          console.log('marker clicked')
        },
      }}>
        <Popup
        >
          Новое событие
          <br/>
          </Popup>
      </Marker>
        
    );
  }

  export default NewMarker


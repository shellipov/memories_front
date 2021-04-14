import React, { useState } from "react";
import {
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

  function NewManyMarkers() {
    const [position, setPosition] = useState(null);
    const [popups, setPopups] = useState([]);

    const map = useMapEvents({
      contextmenu(e) {
        map.locate();
        setPosition(e.latlng);
        setPopups([...popups, e.latlng]);
      },
    });

    function del(index){
      const newArr = [...popups];
      newArr.splice(index, 1);
      setPopups(newArr)
    }

    return position === null ? null : (
      popups.map((el, index) =>
      <Marker key={index} position={el} eventHandlers={{
        click: () => {
          console.log('marker clicked')
        },
      }}>
        <Popup
        >
          Событие №{index}
          <br/>
          <button onClick={()=>{del(index)}}>Удалить</button>
          </Popup>
      </Marker>
        )
    );
  }

  export default NewManyMarkers

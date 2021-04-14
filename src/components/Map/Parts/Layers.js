import React from "react";
import {
  TileLayer,
  LayersControl
} from "react-leaflet";

function Layers () {
  return(
    <LayersControl position="topright"><LayersControl.BaseLayer checked name="Color">
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.BaseLayer name="BlackAndWhite">
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer> </LayersControl>
  )
}

export default Layers

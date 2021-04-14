import L from "leaflet";
import img from "../../../images/icon.svg";

export const greenIcon = L.icon({
  iconUrl: img,
  // shadowUrl: '../../../images/leaf-shadow.png',
  iconSize: [38, 38], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -38], // point from which the popup should open relative to the iconAnchor
});

export const bigGreenIcon = L.icon({
  iconUrl: img,
  // shadowUrl: '../../../images/leaf-shadow.png',
  iconSize: [50, 50], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -50], // point from which the popup should open relative to the iconAnchor
});

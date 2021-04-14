import axios from 'axios';

const apiKey = '7843663fc654428ea52abfc8c5623aac';

const API = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1",
});

export const revGeoCoder = (lat, lng) => API.get(`json?key=${apiKey}&q=${lat}+${lng}&pretty=1&no_annotations=1`)
    .then((response) => response.data);

export const forGeoCoder = (address) => API.get(`json?key=${apiKey}&q=${address}&pretty=1&no_annotations=1`)
    .then((response) => response.data);

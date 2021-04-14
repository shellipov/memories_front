import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserPosition } from "../../redux/actions/mainActions";

function GetGeo() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    async function success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      dispatch(setUserPosition({ lat, lng }));
    }
    function error() {
      console.log("error");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [dispatch]);

  return <></>;
}

export default GetGeo;

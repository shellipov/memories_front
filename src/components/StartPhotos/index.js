import React, { useState, useEffect, useMemo } from "react";
import img1 from "../../images/back_1.jpg";
import img2 from "../../images/back_2.jpg";
import img3 from "../../images/back_3.jpg";
import "./style.scss";

function StartPhotos() {
  const photoList = useMemo(() => [img1, img2, img3], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      index < photoList.length - 1 ? setIndex(index + 1) : setIndex(0);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, photoList]);

  return (
    <>
      <img className="start_image" src={photoList[index]} alt="photos" />
    </>
  );
}

export default StartPhotos;

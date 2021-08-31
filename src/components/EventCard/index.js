import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentEvent } from "../../redux/actions";
import { getEventPhotos } from "../../api/backApi";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTimesCircle, faArrowAltCircleRight, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

function EventCard({ event }) {
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.events.currentEvent);
  const history = useHistory();
  const [photos, setPhotos] = useState([]);
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrowNext" onClick={onClick}>
        <FontAwesomeIcon className="text-white" icon={faArrowAltCircleRight} size="2x"/>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrowPrev" onClick={onClick}>
        <FontAwesomeIcon className="text-white" icon={faArrowAltCircleLeft} size="2x"/>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function openEvent(id) {
    history.push(`/event${id}`);
  }

  function selectEvent(id) {
    const map = document.getElementById("map");
    setTimeout(() => {
      map.click();
    }, 50);
    dispatch(setCurrentEvent(id));
  }

  useEffect(() => {
    if (currentEvent === event._id) {
      getEventPhotos(event._id).then((response) => {
        setPhotos(response.data);
      });
    }
    return null;
  }, [event._id, currentEvent]);

  return (
    <>
      <div className="event_card">
        <div
          className="event_card_title row justify-content-between align-items-center"
          onClick={() => selectEvent(event._id)}
        >
          <div>
            <b>{event.date}</b>
            {" - "}
            <span style={{ color: "gray" }}>{event.title}</span>
          </div>
          {currentEvent === event._id && (
            <button
              className="btn btn-sm btn-link text-danger"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setCurrentEvent(null));
              }}
            >
              <FontAwesomeIcon  icon={faTimesCircle} size="lg"/>
            </button>
          )}
        </div>
        {currentEvent === event._id && (
          <>
          <div className="animate__animated animate__zoomIn">

            <div className=" row justify-content-center m-3">
              <button
                onClick={() => openEvent(event._id)}
                className="btn btn-sm btn-link text-info"
              >
                <FontAwesomeIcon icon={faEdit} size="2x"/>
              </button>
            </div>
            <div>
              <b>Место - </b>
              {event.place_name}
            </div>
            <div>
              <b>Адрес - </b>
              {event.address}
            </div>
            <div>
              <b>Описание - </b>
              {event.description}
            </div>
            <div>
              <b>Фото</b>
            </div>

            <div className="photo_container">
              {photos[0] ? (
                <>
                  <Slider {...settings}>
                    {photos.map((photo, index) => (
                      <div key={index}>
                        <div className="photo_box">
                          <a
                            className="customer fansy_link"
                            data-fancybox="gallery"
                            href={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                            title={photo.description}
                          >
                            <img
                              className="fansy_image event_photo"
                              src={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                              alt="book_image"
                            />
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </>
              ) : (
                <>
                  <div className="col">
                    <span>Тут пока нет фото</span>
                  </div>
                </>
              )}
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default EventCard;

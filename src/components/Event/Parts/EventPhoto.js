import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOnePhoto,
  tryGetEventPhoto,
  tryDeletePhoto,
} from "../../../redux/actions/photoActions";

import AddPhoto from "./AddPhoto";
// import "../style.scss";

function EventPhoto() {
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
  const photos = useSelector((state) => state.photo.eventPhotos);

  function deleteImage(id) {
    dispatch(tryDeletePhoto(id));
  }

  useEffect(() => {
    if (event) {
      dispatch(tryGetEventPhoto(event._id));
    }
    return null;
  }, [event, dispatch]);

  return (
    <>
      <div className="event_component">
        <div className="row justify-content-start align-items-center photo_container">
          {photos[0] &&
            photos.map((photo) => (
              <div key={photo._id} className="col-md-2">
                <div className="photo_title">{photo.title}</div>

                <div className="photo_block">
                  <a
                    className="customer fansy_link"
                    data-fancybox="gallery"
                    href={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                    data-caption={`${photo.title}. ${photo.description}`}
                  >
                    <div className="fancy_photo_block">
                      <img
                        className="fansy_image event_photo "
                        src={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                        alt="book_image"
                      />
                    </div>
                  </a>
                </div>
                <div className="button_image_block">
                  <button
                    onClick={() => {
                      dispatch(getOnePhoto(null));
                      history.push(`/photo${photo._id}`);
                    }}
                    className="btn btn-link btn-sm"
                  >
                    Подробнее
                  </button>
                  <button
                    onClick={() => deleteImage(photo._id)}
                    className="btn btn-link btn-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          <AddPhoto />
        </div>
      </div>
    </>
  );
}

export default EventPhoto;

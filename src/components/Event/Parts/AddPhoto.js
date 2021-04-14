import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tryAddPhoto } from "../../../redux/actions/photoActions";
import { Row, Col } from "react-bootstrap";
// import "../style.scss";

function AddPhoto() {

  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
  const user = useSelector((state) => state.auth.user);
  const [file, setFile] = useState(null);

  function addPhoto(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("creator", `${user.id}`);
    formData.append("eventID", `${event._id}`);
    formData.append("title", "");
    for (let i = 0; i < file.length; i++) {
      formData.append("img", file[i]);
    }
    formData.append("description", "");

    dispatch(tryAddPhoto(formData))
    setFile(null);
  }

  function getFiles(e) {
    e.preventDefault();
    setFile(e.dataTransfer.files);
  }
  return (
    <>
      <div className="col-md-2">
        <form onDrop={getFiles} onSubmit={addPhoto} className="add_photo_form">
          <Row htmlFor="add_photo">
            <Col>
            <label for="add_photo"> <span>Добавить фотографии</span> </label>
              <input
                hidden
                name='file'
                className="input_file"
                id="add_photo"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files);
                }}
                multiple
              />
            </Col>
          </Row>
          {file && file[0] && (
            <>
              <button className="btn btn-dark" type="submit">
                Загругить {file.length} шт.
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default AddPhoto;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tryGetOneEvent, tryEditEvent } from "../../redux/actions";
import { getOnePhoto } from "../../redux/actions/photoActions";
import { createPhoto, getEventPhotos, deletePhoto } from "../../api/backApi";
import Loading from "../Functions/Loading";
import EventMap from "../EventMap";
import Modal from "../Modal";
import { Row, Col, Button } from "react-bootstrap";
import "./style.scss";
function Event() {
  const initialInputs = {
    title: "",
    date: "",
    description: "",
    place_name: "",
    address: "",
    position: "",
  };
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.event);
  const user = useSelector((state) => state.auth.user);

  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [inputs, setInputs] = useState(initialInputs);
  const { title, date, description, place_name, address, position } = inputs;
  const [isChanges, setIsChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function changeInputValue({ target: { name, value } }) {
    setIsChanges(true);
    setInputs({ ...inputs, [name]: value });
  }

  function saveChanges() {
    dispatch(tryEditEvent(id, inputs));
    setIsChanges(false);
    setModalVisible(false);
  }

  function exit() {
    if (!isChanges) {
      history.push(`/`);
    } else {
      setModalVisible(true);
    }
  }

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
    createPhoto(formData).then((response) => {
      setPhotos([...photos, ...response.data]);
    });
    setFile(null);
  }

  function deleteImage(id) {
    deletePhoto(id).then((response) => {
      const photo = photos.find((el) => el._id === `${response.data}`);
      const index = photos.indexOf(photo);
      const newPhotos = [...photos];
      newPhotos.splice(index, 1);
      setPhotos(newPhotos);
    });
  }

  function getFiles(e) {
    e.preventDefault();
    let files = [e.dataTransfer.files];
    console.log(files);
    setFile(e.dataTransfer.files);
  }

  useEffect(() => {
    dispatch(tryGetOneEvent(id));
    return null;
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setInputs(event);
      getEventPhotos(event._id).then((response) => {
        setPhotos(response.data);
      });
    }
    return null;
  }, [event]);

  return (
    <>
      <Row className="justify-content-between">
        <Button className="btn-primary btn-sm" onClick={exit}>
          Назад
        </Button>
      </Row>
      {event ? (
        <>
          <div className="event_page animate__animated animate__zoomIn">
            <Row className="justify-content-center align-items-center">
              <Col className="col-md-7">
                <Row className="justify-content-center align-items-center">
                  <Col className="col-md-4 text-right">Дата события</Col>
                  <Col className="col-md-8">
                    <input
                      required
                      className="form-control form-control-plaintext"
                      type="date"
                      name="date"
                      onChange={(e) => changeInputValue(e)}
                      value={date}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center ">
                  <Col className="col-md-4 text-right">Название события</Col>
                  <Col className="col-md-8">
                    <input
                      required
                      className="form-control form-control-plaintext"
                      type="text"
                      name="title"
                      onChange={(e) => changeInputValue(e)}
                      value={title}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center ">
                  <Col className="col-md-4 text-right">Название места</Col>
                  <Col className="col-md-8">
                    <textarea
                      required
                      className="form-control form-control-plaintext"
                      type="text"
                      name="place_name"
                      onChange={(e) => changeInputValue(e)}
                      value={place_name}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center ">
                  <Col className="col-md-4 text-right">Адрес места</Col>
                  <Col className="col-md-8">
                    <textarea
                      required
                      className="form-control form-control-plaintext"
                      type="text"
                      name="address"
                      onChange={(e) => changeInputValue(e)}
                      value={address}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center ">
                  <Col className="col-md-4 text-right">Координаты</Col>
                  <Col className="col-md-8">
                    <input
                      readOnly
                      required
                      className="form-control form-control-plaintext"
                      type="text"
                      name="title"
                      value={`${position.lat}/ ${position.lng}`}
                    />
                  </Col>
                </Row>

                <Row className="justify-content-center align-items-center ">
                  <Col className="col-md-4 text-right">Описание</Col>
                  <Col className="col-md-8">
                    <textarea
                      required
                      className="form-control form-control-plaintext"
                      type="text"
                      name="description"
                      onChange={(e) => changeInputValue(e)}
                      value={description}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center ">
                  {isChanges && (
                    <Button className="btn-primary btn-sm" onClick={saveChanges}>
                      Сохранить изменения
                    </Button>
                  )}
                </Row>
              </Col>
              <Col className="col-md-5">
                <EventMap lat={position.lat} lng={position.lng} />
              </Col>
            </Row>

            <div className="row justify-content-start align-items-center photo_container">
              {photos[0] ? (
                <>
                  {photos.map((photo) => (
                    <div key={photo._id} className="col-md-2">
                      <div className="photo_title">{photo.title}</div>

                      <div className="photo_block">
                        <a
                          className="customer fansy_link"
                          data-fancybox="gallery"
                          href={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                          data-caption={`${photo.title}. ${photo.description}`}
                        >
                          <div className='fancy_photo_block'>

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
                  <div className='col-md-2'>
                  <form
              onDrop={getFiles}
              onSubmit={addPhoto}
              className="add_photo_form"
            >
              <Row htmlFor="add_photo">
                <Col>
                  <input
                    className="input-group-prepend"
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
                  <button className="btn btn-danger" type="submit">
                    Загругить
                  </button>
                </>
              )}
            </form>
                  </div>
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
          <Modal
            visible={modalVisible}
            setVisible={setModalVisible}
            text={"Соранить изменения?"}
            yes={() => {
              saveChanges();
              history.push(`/`);
            }}
            no={() => {
              history.push(`/`);
            }}
          />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default Event;

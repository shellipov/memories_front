import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  tryGetOnePhoto,
  tryEditOnePhoto,
} from "../../redux/actions/photoActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { Row, Button } from "react-bootstrap";

import Loading from "../Functions/Loading";

function OnePhotoPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const photo = useSelector((state) => state.photo.photo);
  const initialInputs = {
    title: "",
    description: "",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const { title, description } = inputs;
  const [isChanges, setIsChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function changeInputValue({ target: { name, value } }) {
    setIsChanges(true);
    setInputs({ ...inputs, [name]: value });
  }

  function saveChanges() {
    dispatch(tryEditOnePhoto(id, { ...photo, title, description }));
    setIsChanges(false);
    setModalVisible(false);
  }

  function exit() {
    if(!isChanges){
      history.push(`/event${photo.eventID}`)
    } else{
      setModalVisible(true)
    }
  }

  useEffect(() => {
    dispatch(tryGetOnePhoto(id));
  },[dispatch, id])

  useEffect(() => {
    if (photo) {
      setInputs({
        title: photo.title,
        description: photo.description,
      });
    }
  }, [ photo]);

  return (
    <>
      {photo ? (
        <>
          <div  className="one_photo">
            <Row>
              <Button style={{'margin-top': '5rem'}} onClick={exit}>Назад</Button>
            </Row>
            <Row className="justify-content-center" >
              <a
                className="customer fansy_link"
                data-fancybox="gallery"
                href={`${process.env.REACT_APP_API_URL}/${photo.img}`}
              >
                <img
                  style={{ display: "block", height: "60vh" }}
                  className="fansy_image event_photo"
                  src={`${process.env.REACT_APP_API_URL}/${photo.img}`}
                  alt="event_image"
                />
              </a>
            </Row>
            <Row>
              <input
                className="form-control "
                type="text"
                name="title"
                onChange={(e) => changeInputValue(e)}
                value={title}
                placeholder="Название"
              />
            </Row>
            <Row>
              <textarea
                className="form-control "
                type="text"
                name="description"
                onChange={(e) => changeInputValue(e)}
                value={description}
                placeholder="Описание"
              />
            </Row>
            <Row>
              {isChanges && (
                <Button onClick={saveChanges}>Сохранить изменения</Button>
              )}
            </Row>
          </div>
          <Modal
            visible={modalVisible}
            setVisible={setModalVisible}
            text={"Соранить изменения?"}
            yes={()=>{saveChanges();history.push(`/event${photo.eventID}`)}}
            no={()=>{history.push(`/event${photo.eventID}`)}}
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

export default OnePhotoPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tryGetOneEvent, tryEditEvent } from "../../../redux/actions";
import Loading from "../../Functions/Loading";
import EventMap from "../../EventMap";
import Modal from "../../Modal";
import { Row, Col, Button } from "react-bootstrap";

function EventData() {
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

  useEffect(() => {
    dispatch(tryGetOneEvent(id));
    return null;
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setInputs(event);
    }
    return null;
  }, [event]);

  return (
    <>
      {event ? (
        <>
          <div className="event_component">
            <Row className="justify-content-center align-items-center">
              <Col className="col-md-7">
                <Row className="justify-content-between">
                  <Col>
                    <Button className="btn-secondary ml-5" onClick={exit}>
                      ⏎
                    </Button>
                  </Col>
                </Row>
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
                    <Button
                      className="btn-primary btn-sm"
                      onClick={saveChanges}
                    >
                      Сохранить изменения
                    </Button>
                  )}
                </Row>
              </Col>
              <Col className="col-md-5">
                <EventMap lat={position.lat} lng={position.lng} />
              </Col>
            </Row>
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

export default EventData;

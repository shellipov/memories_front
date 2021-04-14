import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDom from "react-dom";
import {
  setCreateEventWindowVisible,
  tryAddEvent,
  setCurrentCoordinates,
} from "../../redux/actions";
import "./style.scss";

function CreateEvent() {
  const dispatch = useDispatch();
  const createEventWindow = useRef(null);
  const geocoderReverseData = useSelector(
    (state) => state.events.geocoderReverseData.data
  );

  const currentCoordinates = useSelector(
    (state) => state.events.currentCoordinates
  );
  const events = useSelector((state) => state.events.events);

  const todayDate = new Date()
    .toLocaleString()
    .slice(0, 10)
    .split(".")
    .reverse()
    .join("-");

  const initialInputs = {
    title: "",
    date: "",
    description: "",
    place_name: "",
    photos: [],
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [error, setError] = useState(null);

  const { title, date, description, place_name } = inputs;

  const createEventWindowVisible = useSelector(
    (state) => state.auth.createEventWindowVisible
  );

  function changeInputValue({ target: { name, value } }) {
    setError(null);
    setInputs({ ...inputs, [name]: value });
  }

  function close(e) {
    // e.stopPropagation();
    createEventWindow.current.classList.remove("animate__zoomIn");
    createEventWindow.current.classList.add("animate__zoomOut");
    setTimeout(() => {
      dispatch(setCreateEventWindowVisible(false));
    }, 220);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      tryAddEvent({
        ...inputs,
        position: currentCoordinates,
        address: geocoderReverseData,
      })
    );
    dispatch(setCurrentCoordinates(null));
    createEventWindow.current.classList.remove("animate__zoomIn");
    createEventWindow.current.classList.add("animate__zoomOut");
    setTimeout(() => {
      dispatch(setCreateEventWindowVisible(false));
    }, 220);
  }

  useEffect(() => {
    setInputs({
      title: `Событие ${events.length}`,
      date: todayDate,
      description: "",
      place_name: `Место ${events.length}`,
      photos: [],
    });
  }, [events, todayDate]);

  return ReactDom.createPortal(
    <>
      {createEventWindowVisible && (
        <div
          // onClick={close}
          className="create_event_background"
        >
          <div
            ref={createEventWindow}
            className="create_event_window animate__animated animate__zoomIn"
          >
            <div className="row justify-content-end close_button_container">
              <div className="col">
                <button
                  className="btn btn-danger btn-sm add_book_botton"
                  type="button"
                  onClick={close}
                >
                  X
                </button>
              </div>
            </div>
            <div className="row justify-content-center ">
              <h2 className="massage">Новое событие</h2>
            </div>

            <div className="row justify-content-center ">
              <form onSubmit={handleSubmit}>
                <label>
                  Название
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="День рождения"
                    type="text"
                    name="title"
                    onChange={(e) => changeInputValue(e)}
                    value={title}
                    maxLength={30}
                  />
                </label>

                <label>
                  Дата
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="Например: Лев Толстой (Если авторов несколько, введите их через запятую)"
                    type="date"
                    name="date"
                    onChange={(e) => changeInputValue(e)}
                    value={date}
                  />
                </label>

                <label>
                  Адрес события
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="г. Москва, ул. Миклухо-Маклая, 18"
                    type="text"
                    name="address"
                    readOnly
                    value={geocoderReverseData ? geocoderReverseData : ""}
                  />
                </label>

                <label>
                  Название места
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="Дом"
                    type="text"
                    name="place_name"
                    onChange={(e) => changeInputValue(e)}
                    value={place_name}
                  />
                </label>

                <label>
                  Описание
                  <textarea
                    className="form-control form-control-sm"
                    placeholder="Убухались в дрободан"
                    type="text"
                    name="description"
                    onChange={(e) => changeInputValue(e)}
                    value={description}
                  />
                </label>
                <div className="row justify-content-center">
                  {error && <span className="error">Ошибка: {error}</span>}
                </div>
                <div className="row justify-content-center">
                  <p>Фотки можно будет добавить, но потом</p>
                </div>
                <div className="row justify-content-center">
                  <button
                    className="btn btn-primary btn-sm add_book_botton"
                    type="submit"
                  >
                    Добавить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
}
export default CreateEvent;

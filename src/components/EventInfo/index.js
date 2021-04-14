import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentCoordinates,
  setCreateEventWindowVisible,
  loadRevGeo,
  tryAddEvent,
  successfulLoadingRevGeo
} from "../../redux/actions";
import "./style.scss";

function Event() {
  const eventWindow = useRef(null);
  const dispatch = useDispatch();
  const currentCoordinates = useSelector(
    (state) => state.events.currentCoordinates
  );
  const geocoderReverseData = useSelector(
    (state) => state.events.geocoderReverseData
  );

  // function add() {
  //   dispatch(setCreateEventWindowVisible(true));
  // }

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

  function close() {
    dispatch(successfulLoadingRevGeo(null))
    eventWindow.current.classList.remove("animate__slideInUp");
    eventWindow.current.classList.add("animate__slideOutDown");
    setTimeout(() => {
      dispatch(setCurrentCoordinates(null));
    }, 200);
  }

  function changeInputValue({ target: { name, value } }) {
    setError(null);
    setInputs({ ...inputs, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      tryAddEvent({
        ...inputs,
        position: currentCoordinates,
        address: geocoderReverseData.data,
      })
    );
    dispatch(setCurrentCoordinates(null));
    setTimeout(() => {
      dispatch(setCreateEventWindowVisible(false));
    }, 220);
  }

  useEffect(() => {
    (async () => {
      if (currentCoordinates) {
        const { lat, lng } = currentCoordinates;
        dispatch(loadRevGeo(lat, lng));
      }
    })();
  }, [currentCoordinates, dispatch]);

  useEffect(() => {
    setInputs({
      title: `Событие ${events.length}`,
      date: todayDate,
      description: "",
      place_name: `Место ${events.length}`,
      photos: [],
    });
  }, [events, todayDate]);

  return (
    <>
      {currentCoordinates ? (
        <>
          <div
            ref={eventWindow}
            className="event animate__animated animate__slideInUp"
          >
            <p>
              {" "}
              <b>Событие</b>{" "}
            </p>
            {"Место: "}
            {geocoderReverseData.loading && <p>Loaging...</p>}
            {geocoderReverseData.data && <p>{geocoderReverseData.data}</p>}
            {geocoderReverseData.error && <p>{geocoderReverseData.error}</p>}

            {geocoderReverseData.data && (
              <form className="event_data" onSubmit={handleSubmit}>
                <label>
                  Название:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="День рождения"
                    type="text"
                    name="title"
                    onChange={(e) => changeInputValue(e)}
                    value={title}
                    maxLength={30}
                  />
                </label>

                <label>
                  Дата:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="Например: Лев Толстой (Если авторов несколько, введите их через запятую)"
                    type="date"
                    name="date"
                    onChange={(e) => changeInputValue(e)}
                    value={date}
                  />
                </label>
                {/* 
                <label>
                  Адрес события
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="г. Москва, ул. Миклухо-Маклая, 18"
                    type="text"
                    name="address"
                    readOnly
                    value={geocoderReverseData ? geocoderReverseData.data : ""}
                  />
                </label> */}

                <label>
                  Название места:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="Дом"
                    type="text"
                    name="place_name"
                    onChange={(e) => changeInputValue(e)}
                    value={place_name}
                  />
                </label>

                <label>
                  Описание:
                  <textarea
                    className="form-control form-control-plaintext"
                    // placeholder="Убухались в дрободан"
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
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={close}
                  >
                    Закрыть
                  </button>
                </div>
              </form>
            )}
            {!geocoderReverseData.data && (
              <button className="btn btn-sm btn-outline-danger" onClick={close}>
                Закрыть
              </button>
            )}
          </div>
        </>
      ) : (
        <>{null}</>
      )}
    </>
  );
}

export default Event;

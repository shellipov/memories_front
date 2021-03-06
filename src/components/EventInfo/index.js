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
      title: `?????????????? ${events.length}`,
      date: todayDate,
      description: "",
      place_name: `?????????? ${events.length}`,
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
              <b>??????????????</b>{" "}
            </p>
            {"??????????: "}
            {geocoderReverseData.loading && <p>Loaging...</p>}
            {geocoderReverseData.data && <p>{geocoderReverseData.data}</p>}
            {geocoderReverseData.error && <p>{geocoderReverseData.error}</p>}

            {geocoderReverseData.data && (
              <form className="event_data" onSubmit={handleSubmit}>
                <label>
                  ????????????????:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="???????? ????????????????"
                    type="text"
                    name="title"
                    onChange={(e) => changeInputValue(e)}
                    value={title}
                    maxLength={30}
                  />
                </label>

                <label>
                  ????????:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="????????????????: ?????? ?????????????? (???????? ?????????????? ??????????????????, ?????????????? ???? ?????????? ??????????????)"
                    type="date"
                    name="date"
                    onChange={(e) => changeInputValue(e)}
                    value={date}
                  />
                </label>
                {/* 
                <label>
                  ?????????? ??????????????
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="??. ????????????, ????. ??????????????-????????????, 18"
                    type="text"
                    name="address"
                    readOnly
                    value={geocoderReverseData ? geocoderReverseData.data : ""}
                  />
                </label> */}

                <label>
                  ???????????????? ??????????:
                  <input
                    required
                    className="form-control form-control-plaintext"
                    placeholder="??????"
                    type="text"
                    name="place_name"
                    onChange={(e) => changeInputValue(e)}
                    value={place_name}
                  />
                </label>

                <label>
                  ????????????????:
                  <textarea
                    className="form-control form-control-plaintext"
                    // placeholder="?????????????????? ?? ????????????????"
                    type="text"
                    name="description"
                    onChange={(e) => changeInputValue(e)}
                    value={description}
                  />
                </label>
                <div className="row justify-content-center">
                  {error && <span className="error">????????????: {error}</span>}
                </div>
                <div className="row justify-content-center">
                  <p>?????????? ?????????? ?????????? ????????????????, ???? ??????????</p>
                </div>
                <div className="row justify-content-center">
                  <button
                    className="btn btn-primary btn-sm add_book_botton"
                    type="submit"
                  >
                    ????????????????
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={close}
                  >
                    ??????????????
                  </button>
                </div>
              </form>
            )}
            {!geocoderReverseData.data && (
              <button className="btn btn-sm btn-outline-danger" onClick={close}>
                ??????????????
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

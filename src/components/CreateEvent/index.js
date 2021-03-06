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
      title: `?????????????? ${events.length}`,
      date: todayDate,
      description: "",
      place_name: `?????????? ${events.length}`,
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
              <h2 className="massage">?????????? ??????????????</h2>
            </div>

            <div className="row justify-content-center ">
              <form onSubmit={handleSubmit}>
                <label>
                  ????????????????
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="???????? ????????????????"
                    type="text"
                    name="title"
                    onChange={(e) => changeInputValue(e)}
                    value={title}
                    maxLength={30}
                  />
                </label>

                <label>
                  ????????
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="????????????????: ?????? ?????????????? (???????? ?????????????? ??????????????????, ?????????????? ???? ?????????? ??????????????)"
                    type="date"
                    name="date"
                    onChange={(e) => changeInputValue(e)}
                    value={date}
                  />
                </label>

                <label>
                  ?????????? ??????????????
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="??. ????????????, ????. ??????????????-????????????, 18"
                    type="text"
                    name="address"
                    readOnly
                    value={geocoderReverseData ? geocoderReverseData : ""}
                  />
                </label>

                <label>
                  ???????????????? ??????????
                  <input
                    required
                    className="form-control form-control-sm"
                    placeholder="??????"
                    type="text"
                    name="place_name"
                    onChange={(e) => changeInputValue(e)}
                    value={place_name}
                  />
                </label>

                <label>
                  ????????????????
                  <textarea
                    className="form-control form-control-sm"
                    placeholder="?????????????????? ?? ????????????????"
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

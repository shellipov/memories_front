import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./style.scss";

function Modal({ visible, setVisible, text, yes, no }) {
  const createEventWindow = useRef(null);

  function close() {
    createEventWindow.current.classList.remove("animate__zoomIn");
    createEventWindow.current.classList.add("animate__zoomOut");
    setTimeout(() => {
      setVisible(false);
    }, 220);
  }

  return ReactDom.createPortal(
    <>
      {visible && (
        <div className="modal_background">
          <div
            ref={createEventWindow}
            className="modal_window animate__animated animate__zoomIn"
          >
            <div className="row justify-content-center ">
              <h2 className="massage">{text}</h2>
            </div>

            <div className="row justify-content-center ">
              <button className="btn btn-danger btn-sm m-1" onClick={()=>{no(); close()}}>
                Нет
              </button>
              <button className="btn btn-secondary btn-sm m-1" onClick={()=>{yes(); close()}}>
                Да
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
}
export default Modal;

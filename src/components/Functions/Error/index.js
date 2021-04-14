import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function Error() {
  const error = useSelector((state) => state.events.error);

  return (
    <>
      {error && (
        <div className="error">
          <b>{error}</b>
        </div>
      )}
    </>
  );
}

export default Error;

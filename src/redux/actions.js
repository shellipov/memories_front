import {
  START_LOADING_REV_GEO,
  SUCCESSFUL_LOADING_REV_GEO,
  LOADING_ERROR_REV_GEO,
  START_LOADING_EVENTS,
  SUCCESSFUL_LOADING_EVENTS,
  LOADING_ERROR_EVENTS,
  START_AUTH,
  SUCCESSFUL_AUTH,
  ERROR_AUTH,
  LOGOUT,
  GET_ONE_EVENT,
  EDIT_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  ERROR_EVENT,
  SET_CURRENT_COORDINATES,
  SET_CREATE_EVENT_WINDOW_VISIBLE,
  SET_CURRENT_EVENT,
} from "./actionTypes";
import { revGeoCoder } from "../api/geocoder";
import { getEvents, createEvent, deleteEvent, getEvent, editEvent } from "../api/backApi";

export function startLoadingRevGeo() {
  return {
    type: START_LOADING_REV_GEO,
  };
}

export function successfulLoadingRevGeo(data) {
  return {
    type: SUCCESSFUL_LOADING_REV_GEO,
    payload: data,
  };
}

export function loadingErrorRevGeo(data) {
  return {
    type: LOADING_ERROR_REV_GEO,
    payload: data,
  };
}
export function loadRevGeo(lat, lng) {
  return async (dispatch) => {
    dispatch(startLoadingRevGeo());
    try {
      const data = await revGeoCoder(lat, lng);

      if (data.status.code === 200) {
        dispatch(successfulLoadingRevGeo(data.results[0].formatted));
      } else {
        dispatch(loadingErrorRevGeo("статус загрузки" + data.status.code));
      }
    } catch (err) {
      dispatch(loadingErrorRevGeo(err.message));
    }
  };
}

export function startLoadingEvents() {
  return {
    type: START_LOADING_EVENTS,
  };
}

export function successfulLoadingEvents(data) {
  return {
    type: SUCCESSFUL_LOADING_EVENTS,
    payload: data,
  };
}

export function loadingErrorEvents(data) {
  return {
    type: LOADING_ERROR_EVENTS,
    payload: data,
  };
}
export function loadEvents() {
  return async (dispatch) => {
    dispatch(startLoadingEvents());
    try {
      const { data } = await getEvents();
      if (data) {
        dispatch(successfulLoadingEvents(data));
      } else {
        dispatch(loadingErrorEvents("ОШИБКА ЗАГРУЗКИ"));
      }
    } catch (err) {
      dispatch(loadingErrorEvents(err.message));
    }
  };
}

export function startAuth() {
  return {
    type: START_AUTH,
  };
}

export function successAuth(data) {
  return {
    type: SUCCESSFUL_AUTH,
    payload: data,
  };
}

export function ErrorAuth(data) {
  return {
    type: ERROR_AUTH,
    payload: data,
  };
}

export function auth(authApi) {
  return async (dispatch) => {
    dispatch(startAuth());
    try {
      const data = await authApi;
      if (data) {
        const user = data;
        delete data["iat"];
        delete data["exp"];
        dispatch(successAuth(user));
      } else {
        dispatch(ErrorAuth("Ошибка, попробуйте позже"));
      }
    } catch (err) {
      dispatch(
        ErrorAuth(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function addEvet(event) {
  return {
    type: ADD_EVENT,
    payload: event,
  };
}

export function errorEvet(event) {
  return {
    type: ERROR_EVENT,
    payload: event,
  };
}
export function tryAddEvent(event) {
  return async (dispatch) => {
    try {
      const { data } = await createEvent(event);
      dispatch(addEvet(data));
    } catch (err) {
      dispatch(
        errorEvet(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function deleteEvet(event) {
  return {
    type: DELETE_EVENT,
    payload: event,
  };
}

export function tryDeleteEvent(id) {
  return async (dispatch) => {
    try {
      const { data } = await deleteEvent(id);
      dispatch(deleteEvet(data));
    } catch (err) {
      dispatch(
        errorEvet(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function getOneEvent(event) {
  return {
    type: GET_ONE_EVENT,
    payload: event,
  }
}

export function tryGetOneEvent(id) {
  return async (dispatch) => {
    dispatch(getOneEvent(null))
    try {
      const { data } = await getEvent(id);
      dispatch(getOneEvent(data));
    } catch (err) {
      dispatch(
        errorEvet(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function editOneEvent(event) {
  return {
    type: EDIT_EVENT,
    payload: event,
  }
}

export function tryEditEvent(id, event) {
  return async (dispatch) => {
    try {
      const { data } = await editEvent(id, event);
      dispatch(editOneEvent(data));
    } catch (err) {
      dispatch(
        errorEvet(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function setCurrentCoordinates(event) {
  return {
    type: SET_CURRENT_COORDINATES,
    payload: event,
  };
}

export function setCreateEventWindowVisible(data) {
  return {
    type: SET_CREATE_EVENT_WINDOW_VISIBLE,
    payload: data,
  };
}

export function setCurrentEvent(id) {
  return {
    type: SET_CURRENT_EVENT,
    payload: id,
  };
}

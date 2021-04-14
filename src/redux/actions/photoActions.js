import {
  GET_EVENT_PHOTOS,
  GET_ONE_PHOTO,
  EDIT_ONE_PHOTO,
  ADD_PHOTO,
  DELETE_PHOTO,
  ERROR_PHOTO,
} from "../actionTypes";
import { getEventPhotos, getPhoto , editPhoto, deletePhoto, createPhoto } from "../../api/backApi";


export function getAllEventPhotos(photo) {
  return {
    type: GET_EVENT_PHOTOS,
    payload: photo,
  };
}

export function getOnePhoto(photo) {
  return {
    type: GET_ONE_PHOTO,
    payload: photo,
  };
}

export function editOnePhoto(photo) {
  return {
    type: EDIT_ONE_PHOTO,
    payload: photo,
  };
}

export function deleteOnePhoto(id) {
  return {
    type: DELETE_PHOTO,
    payload: id,
  };
}

export function addPhoto(photo) {
  return {
    type: ADD_PHOTO,
    payload: photo,
  };
}

export function errorPhoto(photo) {
  return {
    type: ERROR_PHOTO,
    payload: photo,
  };
}

export function tryGetEventPhoto(id) {
  return async (dispatch) => {
    try {
      const { data } = await getEventPhotos(id);
      dispatch(getAllEventPhotos(data));
    } catch (err) {
      dispatch(
        errorPhoto(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function tryGetOnePhoto(photo) {
  return async (dispatch) => {
    try {
      const { data } = await getPhoto(photo);
      dispatch(getOnePhoto(data));
    } catch (err) {
      dispatch(
        errorPhoto(err.response ? err.response.data.message : err.message)
      );
    }
  };
}


export function tryEditOnePhoto(id, photo) {
  return async (dispatch) => {
    try {
      const { data } = await editPhoto(id, photo);
      dispatch(getOnePhoto(data));
    } catch (err) {
      dispatch(
        errorPhoto(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function tryAddPhoto(photo) {
  return async (dispatch) => {
    try {
      const { data } = await createPhoto(photo);
      dispatch(addPhoto(data));
    } catch (err) {
      dispatch(
        errorPhoto(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

export function tryDeletePhoto(id) {
  return async (dispatch) => {
    try {
      const { data } = await deletePhoto(id);
      dispatch(deleteOnePhoto(data));
    } catch (err) {
      dispatch(
        errorPhoto(err.response ? err.response.data.message : err.message)
      );
    }
  };
}

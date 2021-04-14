import {
  GET_EVENT_PHOTOS,
  GET_ONE_PHOTO,
  EDIT_ONE_PHOTO,
  ADD_PHOTO,
  DELETE_PHOTO,
  ERROR_PHOTO,
} from "../actionTypes";

const init = {
  eventPhotos: [],
  photo: null,
  error: null,

};

export default function reducer(state = init, action) {
  switch (action.type) {

    case GET_EVENT_PHOTOS:
      return {
        ...state,
        eventPhotos: action.payload,
      };

    case GET_ONE_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    case EDIT_ONE_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    case ADD_PHOTO:
      return {
        ...state,
        eventPhotos: [...state.eventPhotos, ...action.payload,]
      };

    case DELETE_PHOTO:
      const id = action.payload
      const newEventPhotos = state.eventPhotos.filter(photo => photo._id !== id)
      return {
        ...state,
        eventPhotos: newEventPhotos,
      };

    case ERROR_PHOTO:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

import {
  SET_CREATE_EVENT_WINDOW_VISIBLE,
  START_AUTH,
  SUCCESSFUL_AUTH,
  ERROR_AUTH,
  LOGOUT,
} from "../actionTypes";

const init = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
  createEventWindowVisible: false,
};

export default function reducer(state = init, action) {
  switch (action.type) {

    //перенести в другое место
    case SET_CREATE_EVENT_WINDOW_VISIBLE:
      return {
        ...state,
        createEventWindowVisible: action.payload,
      };

    case START_AUTH:
      return {
        ...state,
        loading: true,
        isAuth: false,
        user: null,
        error: null,
      };

    case SUCCESSFUL_AUTH:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
        error: null,
      };

    case ERROR_AUTH:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        isAuth: false,
        user: null,
      };

    default:
      return state;
  }
}

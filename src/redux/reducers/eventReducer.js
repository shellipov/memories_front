import {
  START_LOADING_REV_GEO,
  SUCCESSFUL_LOADING_REV_GEO,
  LOADING_ERROR_REV_GEO,
  START_LOADING_EVENTS,
  SUCCESSFUL_LOADING_EVENTS,
  LOADING_ERROR_EVENTS,
  GET_ONE_EVENT,
  EDIT_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  ERROR_EVENT,
  SET_CURRENT_COORDINATES,
  SET_CURRENT_EVENT,
} from "../actionTypes";

const init = {
  events: [],
  event: null,
  currentCoordinates: null,
  currentEvent: null,
  geocoderReverseData: {
    data: null,
    error: null,
    loading: false,
  },
  loading: false,
  error: null,
};

export default function reducer(state = init, action) {
  switch (action.type) {

    case GET_ONE_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case EDIT_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case ERROR_EVENT:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_EVENT:
      const event = state.events.find((el) => el._id === action.payload);
      const index = state.events.indexOf(event);
      const newEvents = [...state.events];
      newEvents.splice(index, 1);
      return {
        ...state,
        events: [...newEvents],
      };

    case SET_CURRENT_COORDINATES:
      return {
        ...state,
        currentCoordinates: action.payload,
      };

    case START_LOADING_REV_GEO:
      return {
        ...state,
        geocoderReverseData: {
          data: null,
          error: null,
          loading: true,
        },
      };

    case SUCCESSFUL_LOADING_REV_GEO:
      return {
        ...state,
        geocoderReverseData: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };

    case LOADING_ERROR_REV_GEO:
      return {
        ...state,
        geocoderReverseData: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case START_LOADING_EVENTS:
      return {
        ...state,
        loading: true,
        events: [],
        error: null,
      };

    case SUCCESSFUL_LOADING_EVENTS:
      return {
        ...state,
        loading: false,
        events: action.payload,
        error: null,
      };

    case LOADING_ERROR_EVENTS:
      return {
        ...state,
        loading: false,
        events: [],
        error: action.payload,
      };

    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
      };

    default:
      return state;
  }
}

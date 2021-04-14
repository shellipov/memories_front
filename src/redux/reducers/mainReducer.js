import {
  SET_SEARCH_POSITION,
  SET_USER_POSITION,
} from "../actionTypes";

const init = {
  searchPosition: null,
  userPosition: { lat: 55.755814, lng: 37.617635 },
};

export default function reducer(state = init, action) {
  switch (action.type) {

    case SET_SEARCH_POSITION:
      return {
        ...state,
        searchPosition: action.payload,
      };

    case SET_USER_POSITION:
      return {
        ...state,
        userPosition: action.payload,
      };

    default:
      return state;
  }
}

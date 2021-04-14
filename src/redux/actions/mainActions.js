import {
  SET_SEARCH_POSITION,
  SET_USER_POSITION,

} from "../actionTypes";


export function setSearchPosition(position) {
  return {
    type: SET_SEARCH_POSITION,
    payload: position,
  };
}

export function setUserPosition(position) {
  return {
    type: SET_USER_POSITION,
    payload: position,
  };
}

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import eventReducer from "./reducers/eventReducer";
import photoReducer from "./reducers/photoReducer";
import mainReducer from "./reducers/mainReducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    auth: authReducer,
    events: eventReducer,
    photo: photoReducer,
    main: mainReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

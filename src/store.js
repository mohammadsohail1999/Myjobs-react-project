import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/JobRecruiterReducer";

const GlobalReducer = combineReducers({
  authReducer,
  postReducer,
});

const initialState = {
  authReducer: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const store = createStore(
  GlobalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

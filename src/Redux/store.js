import { createStore, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
    userReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;

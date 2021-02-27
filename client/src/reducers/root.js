import sessionReducer from "./session";
import errorReducer from './error'
import { combineReducers } from "redux";

export default combineReducers({
    session: sessionReducer,
    error: errorReducer
})
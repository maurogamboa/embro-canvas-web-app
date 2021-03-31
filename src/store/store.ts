import { createStore, applyMiddleware } from "redux"
import { reducerFileReading } from "./reducers"
import thunk from "redux-thunk";

export default createStore(
  reducerFileReading, 
  applyMiddleware(thunk)
);
// src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware()
    // 다른 미들웨어를 추가할 수 있습니다.
  )
);

export default store;

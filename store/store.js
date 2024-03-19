import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import recordReducer from "./reducers/recordReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    records: recordReducer,
  },
  // 필요한 경우 여기에 다른 설정을 추가할 수 있습니다.
});

export default store;

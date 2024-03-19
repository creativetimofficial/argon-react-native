// actions/recordActions.js
import { FETCH_RECORDS, ADD_RECORD } from "./types";
import axios from "axios";

// 약물 정보 불러오기 액션
export const fetchRecords = () => async (dispatch, getState) => {
  const response = await axios.get("http://35.216.104.91:8080/record", {
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`,
    },
  });
  dispatch({
    type: FETCH_RECORDS,
    payload: response.data,
  });
};

// 약물 정보 추가 액션
export const addRecord = (record) => async (dispatch, getState) => {
  const response = await axios.post(
    "http://35.216.104.91:8080/medicine/save",
    record,
    {
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    }
  );
  dispatch({
    type: ADD_RECORD,
    payload: response.data,
  });
};

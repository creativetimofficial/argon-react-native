// reducers/recordReducer.js
import { FETCH_RECORDS, ADD_RECORD } from "../actions/types";

const initialState = {
  records: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    case ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.payload],
      };
    default:
      return state;
  }
}

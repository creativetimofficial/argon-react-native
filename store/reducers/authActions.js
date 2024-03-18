// src/store/actions/authActions.js
export const setAccessToken = (token) => {
  return {
    type: "SET_ACCESS_TOKEN",
    payload: token,
  };
};

export const removeAccessToken = () => {
  return {
    type: "REMOVE_ACCESS_TOKEN",
  };
};

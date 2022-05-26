import { API_URL } from "../constants/action-types";
/* import { INCREASE } from "../constants/action-types"; */
export const NOTHING = (URL) => ({
  type: API_URL,
  payload: URL,
});

/* export const increase = (count) => ({ type: INCREASE, payload: count }); */

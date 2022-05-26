import { API_URL, INCREASE } from "../constants/action-types";
const initialState = {
  //counter: 1,
  URL: "http://localhost:3001",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_URL:
      return state.URL;
    /*     case INCREASE:
      console.log(state.counter);
      return { ...state.counter, counter: state.counter }; */
    default:
      return state.URL;
  }
};

export default rootReducer;

import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  // Might be a place to store modules
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    // Alongside other stateful data to clear on logout
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

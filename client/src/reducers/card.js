import {
  GET_CARDS,
  GET_CARD,
  CARD_ERROR,
  DELETE_CARD,
  ADD_CARD
} from '../actions/types'

const initialState = {
  cards: [],
  card: null, 
  loading: true,
  error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const { type, payload} = action;

  switch(type) {
    case GET_CARDS:
      return {
        ...state,
        cards: payload,
        loading: false
      }
    case GET_CARD:
      return {
        ...state,
        card: payload,
        loading: false
      }
    case ADD_CARD:
      return {
        ...state,
        cards: [payload, ...state.cards ],
        loading: false
      }
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card._id !== payload),
        loading: false
      }
    case CARD_ERROR:
      return {
        ...state,
        cards: payload,
        loading: false
      }
    default:
      return state;
  }
}
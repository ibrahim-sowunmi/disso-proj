import {
  GET_CARDS,
  GET_CARD,
  CARD_ERROR,
  DELETE_CARD,
  ADD_CARD,
  ADD_COMMENT,
  REMOVE_COMMENT
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
    case ADD_COMMENT:
      return {
        ...state,
        card: { ...state.card, comments: payload},
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.card,
          comments: state.card.comments.filter(comment => comment._id !== payload)
        },
        loading: false
      }
    default:
      return state;
  }
}
import axios from "axios";
import { setAlert } from "./alert";
import { GET_CARDS, GET_CARD, CARD_ERROR, DELETE_CARD, ADD_CARD } from "./types";

// Get cards
export const getCards = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cards");

    dispatch({
      type: GET_CARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get card
export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete card
export const deleteCard = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/cards/${id}`);

    dispatch({
      type: DELETE_CARD,
      payload: id
    });

    dispatch(setAlert("Card Deleted", "success"));
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add card
export const addCard = formData => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/cards/`, formData, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data
    });

    dispatch(setAlert("Card created", "success"));
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
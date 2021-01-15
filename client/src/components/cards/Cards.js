import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCards } from "../../actions/card";
import CardItem from './CardItem';
import CardForm from "./CardForm";

const Cards = ({ getCards, card: { cards, loading }}) => {
  useEffect(() => {
    getCards();
  }, [getCards])
  
  return loading ? <p>Loading...</p> : <>
    <h1 className="large text-primary">Cards</h1>
    <p className="lead">
      <i className="fas fa-user">Welcome to the community</i>
    </p>
    <CardForm />
    <div className="cards">
      {cards.map(card => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  </>;
};

Cards.propTypes = {
  getCards: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps, { getCards })(Cards);

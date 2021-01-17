import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCard } from "../../actions/card";
import CardItem from "../cards/CardItem";
import CommentForm from '../card/CommentForm';
import CommentItem from '../card/CommentItem';
import { Link } from "react-router-dom";

const Card = ({ getCard, card: { card, loading }, match }) => {
  useEffect(() => {
    getCard(match.params.id);
  }, [getCard, match.params.id]);

  return loading || card === null ? (
    <p>Loading...</p>
  ) : (
    <>
      <Link to="/cards" className="btn">
        Back to Cards
      </Link>
      <CardItem key={card._id} card={card} />
      <CommentForm cardId={card._id} />
      <div className="comments">
        {card.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} cardId={card._id} />
        ))}
      </div>
    </>
  );
};

Card.propTypes = {
  getCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps, { getCard })(Card);

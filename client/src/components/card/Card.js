import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCard } from "../../actions/card";

const Card = ({ getCard, card: { card, loading }, match }) => {
  useEffect(() => {
    getCard(match.params.id);
  }, [getCard, match.params.id]);

  return <div>love shlockin cocking</div>;
};

Card.propTypes = {
  getCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps, { getCard })(Card);

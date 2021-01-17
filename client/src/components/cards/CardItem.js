import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/card";
// TODO - create a hide toggle functionality for answers
// TODO - Fix the delete button component
const CardItem = ({
  deleteCard,
  auth,
  card: { _id, question, answer, module, name, user, comments, date },
  showComments,
}) => {
  // const [hideAnswer, answer]

  // TODO - Post the role/student of card creator
  return (
    <div className="card bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <h4>{`${name}`}</h4>
        </a>
      </div>
      <div>
        <p className="btn btn-primary">{module}</p>
        <p className="my-1">{question}</p>
        <p className="my-1">{answer}</p>
        <p className="card-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {/* <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button> */}
        {showComments && (
          <>
            <Link to={`/cards/${_id}`} className="btn btn-primary">
              Comments{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
          </>
        )}
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteCard(_id)}
            type="button"
            className="btn btn-danger"
          >
            {console.log()}
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCard })(CardItem);

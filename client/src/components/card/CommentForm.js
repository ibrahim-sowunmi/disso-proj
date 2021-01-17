import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/card";

const CommentForm = ({ cardId, addComment }) => {
  const [text, setText] = useState("");

  
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(cardId, { text });
    console.log(cardId, text);
    setText("");
  };

  return (
    <div className="card-form">
      <div className="bg-primary p">
        <h3>{cardId}</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

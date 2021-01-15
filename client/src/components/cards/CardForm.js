import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCard } from "../../actions/card";

const CardForm = ({ addCard }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    module: "",
  });

  const { question, answer, module } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCard(formData);
    setFormData({
      question: "",
      answer: "",
      module: "",
    });
  };

  return (
    <div className="card-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="module" value={module} onChange={(e) => onChange(e)}>
            <option value="0">* Select relevant module</option>
            <option value="Student">DUMMYMOD12</option>
            <option value="Ta">DUMMYMOD34</option>
            <option value="Lecturer">DUMMYMOD56</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Front of flashcard? Question? Advice?"
            name="question"
            value={question}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">huh</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer? Other side of flash card?"
            name="answer"
            value={answer}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default connect(null, { addCard })(CardForm);

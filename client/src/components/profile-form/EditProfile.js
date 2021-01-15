import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

// TODO - LEC 47 - Contains hidable contenet for POSTS (half way through)
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    student: "",
    bio: "",
    modules: "",
    contactable: "",
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      student: loading || !profile.student ? "" : profile.student,
      bio: loading || !profile.bio ? "" : profile.bio,
      contactable: loading || !profile.contactable ? "" : profile.contactable,
      modules: loading || !profile.contactable ? "" : profile.modules.join(","),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // TODO - add modules
  const { student, contactable, bio, modules } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information before you
        start learning!
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="student" value={student} onChange={(e) => onChange(e)}>
            <option value="0">* Select Academic role</option>
            <option value="Student">Student</option>
            <option value="Ta">Teaching assistant</option>
            <option value="Lecturer">Lecturer</option>
          </select>
          <small className="form-text">
            Select you role, to dispense knowledge and to promote good answers
          </small>
        </div>
        {/* TODO - handle multiple checkbox input at once? */}
        <div className="form-group">
          <input
            type="text"
            placeholder="* Modules"
            name="modules"
            value={modules}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg.
            COMP123,PSYCH123,COMPXX,BIOLXXX)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="form-group">
          <select
            name="contactable"
            value={contactable}
            onChange={(e) => onChange(e)}
          >
            <option value="0">*Can other students contact you?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <small className="form-text">
            Pedagogy is one of the best methods of self-improvement
          </small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

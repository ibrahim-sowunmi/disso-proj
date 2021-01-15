import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    student,
    modules,
    bio,
    contactable,
    rank,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <p>{`Rank: ${rank}`}</p>
      <img className="round-img my-1" src={avatar} alt={name} />
      <h1 className="large">{name}</h1>
      <p className="lead">{student}</p>
      <ul>
        {modules.map((module, index) => (
          <li key={index} className="btn btn-dark">{module}</li>
        ))}
      </ul>
      <br></br>
      <p>{bio && <span>{bio}</span>}</p>
      <p>{contactable ? "You can contact me!" : "I prefer not to be contacted"}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

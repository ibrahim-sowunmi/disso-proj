import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    modules,
    rank,
    contactable,
    student,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt={name} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{student}</p>
        <p>{bio && <span>{bio}</span>}</p>
        <p>{contactable && <span>{contactable}</span>}</p>
        <p>{rank && <span>{`Rank: ${rank}`}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {modules.map((module, i) => (
          <li key={i} className="text-primary">
            <i className="fas fa-book">{module}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

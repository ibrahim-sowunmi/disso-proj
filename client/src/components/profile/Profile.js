import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileTop from './ProfileTop';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
        </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

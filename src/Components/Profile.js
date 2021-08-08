import React from "react";
import { useStateValue } from "../StateProvider";
import "./Styles/Profile.css";
function Profile() {
  const [{ user }] = useStateValue();
  return (
    <div className="profile">
      <div className="profile_details_grp">
        <div className="child_grp">
          <div className="profile_details_grp_child1">
            <img src={user?.photoURL} alt=""></img>
          </div>
          <div className="profile_details_grp_child2">
            <p>Your Username : {user?.displayName}</p>
            <p>Your Email : {user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

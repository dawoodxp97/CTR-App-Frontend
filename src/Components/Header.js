import React from "react";
import "./Styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import AttachFileIcon from "@material-ui/icons/AttachFile";
function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <h3>Chats</h3>
        <SearchIcon />
      </div>
      <div className="header_right">
        <div className="header_user">
          <div className="header_user_item1">
            <Avatar
              alt="Remy Sharp"
              src="https://thumbs.dreamstime.com/b/colorful-people-group-team-logo-design-symbol-illustration-abstract-characters-vector-124513112.jpg"
            />
            <h5>Team CTR</h5>
          </div>
          <div className="header_user_item2">
            <CallIcon />
            <AttachFileIcon />
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

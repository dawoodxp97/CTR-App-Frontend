import React, { useState } from "react";
import "./Styles/Chats.css";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import { Avatar } from "@material-ui/core";
import timestamp from "time-stamp";
import axios from "./../axios";
import { useStateValue } from "../StateProvider";

function Chats({ messages }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: user?.displayName,
      timestamp: timestamp("YYYY/MM/DD- HH:mm"),
      received: true,
    });
    setInput("");
  };
  return (
    <div className="chats_group">
      <div className="left_chat">
        <div className="left_chat_ind">
          <Avatar
            alt="Remy Sharp"
            src="https://thumbs.dreamstime.com/b/colorful-people-group-team-logo-design-symbol-illustration-abstract-characters-vector-124513112.jpg"
          />
          <h5>Team CTR</h5>
        </div>
      </div>
      <div className="right_chat">
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`chat_message ${
                message.name === user?.displayName && "chat_message_reciever"
              }`}
            >
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp"> {message.timestamp} </span>
            </p>
          ))}
        </div>
        <div className="chat_footer">
          <EmojiEmotionsIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your Message"
              className="chat_input"
              type="text"
              name="name"
            />
            <button onClick={sendMessage} type="submit"></button>
          </form>
          <SendIcon onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chats;

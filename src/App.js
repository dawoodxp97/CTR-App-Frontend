import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chats from "./Components/Chats";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import { auth } from "./firebase";
import Pusher from "pusher-js";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
function App() {
  const [messages, setMessages] = useState([]);
  const [, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("8a3110eb4f1e43cf37aa", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/profile">
            <Sidebar />
            <Profile />
          </Route>
          <Route path="/homepage">
            <Header />
            <Sidebar />
            <Chats messages={messages} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;

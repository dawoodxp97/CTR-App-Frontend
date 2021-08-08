import React, { useState } from "react";
import "./Styles/Signup.css";
import Llogo from "./images/61fb2e7aca0c9e8b9e7bde5db155d538.png";
import { Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
function Signup() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User Created
        if (userCredential) {
          console.log("This is User Credential>>>", userCredential);
          alert("Successfully Created your CTR account. Enjoy your CTR App");
          History.push("/homepage");
        }
      })
      .then(() => {
        const currUser = auth.currentUser;
        currUser.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  return (
    <div className="signup">
      <div className="logo">
        <img alt="" src={Llogo} />
        <div className="logo_title">
          <h1>C T R</h1>
          <Tooltip
            title="The term CTR is the English expressions for gossiping or making friendly small talk, or a long and informal conversation with someone."
            placement="right"
            arrow
          >
            <h4>(Chew the Rag)</h4>
          </Tooltip>
          <p>
            <strong>CTR-App</strong> is a Fully Functional Real-Time Messaging
            App Capable of Private (One-on-One), Group Messaging.
          </p>
        </div>
      </div>
      <div className="signup_details">
        <div className="signup_form_group">
          <form className="signup_form">
            <h1>Sign-Up</h1>
            <h5>User Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup_form_input"
            />
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup_form_input"
            />

            <h5>Password</h5>
            <input
              type="password"
              className="signup_form_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={signUp} className="signUpButton">
              Sign Up
            </button>
            <p>
              Already have account ? -{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ff9900",
                }}
                to="/"
              >
                {" "}
                Sign-In{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

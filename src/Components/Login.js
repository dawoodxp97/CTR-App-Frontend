import React, { useState } from "react";
import "./Styles/Login.css";
import Llogo from "./images/61fb2e7aca0c9e8b9e7bde5db155d538.png";
import { Tooltip } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          History.push("/homepage");
        }
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Signed In
        History.push("/homepage");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login_logo">
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
      <div className="login_details">
        <div className="form_group">
          <form className="form">
            <h1>Sign-In</h1>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form_input"
            />

            <h5>Password</h5>
            <input
              type="password"
              className="form_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" onClick={signIn} className="signInButton">
              Sign In
            </button>
            <p>
              Don't have account ? -{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ff9900",
                }}
                to="/signup"
              >
                {" "}
                Sign-Up{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
        <Tooltip title="Login with Google" arrow>
          <div onClick={googleAuth} className="google_logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/480px-Google_%22G%22_Logo.svg.png"
              alt=""
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Login;

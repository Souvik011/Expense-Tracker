import React, { useContext,useRef } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../Context/Login-Context";
import classes from "./LoginPage.module.css";

const LogInPage = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");

  

  const loginCtx = useContext(LoginContext);

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDICIhykIkqE7MfZMMbKHGVp7G1EQVAeK4",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: pswdValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data.email);

      emailRef.current.value = "";
      pswdRef.current.value = "";

      loginCtx.login(data.email, data.idToken);

      
    } else {
      alert(data.error.message);
    }
  };
  return (<React.Fragment>
    <form onSubmit={signInSubmitHandler} className={classes.signIn}>
      <div>
        <h3>Log In</h3>
      </div>
      <div>
        <input
          id="emailId"
          placeholder="Email"
          type="text"
          ref={emailRef}
        ></input>
        <input
          id="passwordId"
          placeholder="Password"
          type="password"
          ref={pswdRef}
        />
      </div>
      <button>Log In</button>
      <div>
      <NavLink to="/signUp">Forgot Password Click Here</NavLink>
      </div>
      
    </form>
    <div className={classes.section}>
        Don't Have a Account ? <NavLink to="/signUp">Sign Up </NavLink> Now
    </div>
    </React.Fragment>
  );
};

export default LogInPage;

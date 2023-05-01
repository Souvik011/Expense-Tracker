import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import classes from "./WelcomePage.module.css";
import LoginContext from "../Context/Login-Context";

const WelcomePage = () => {
  const loginCtx = useContext(LoginContext);
    const verifyEmailHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDICIhykIkqE7MfZMMbKHGVp7G1EQVAeK4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: loginCtx.idToken,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.email);
      } else {
        alert(data.error.message);
      }
    };
  return (
    <div>
      <div className={classes.section}>
        <h2 className={classes.title}>Welcome To Expense Tracker</h2>
      </div>
      <div className={classes.status}>
        To Complete Your Profile
        <NavLink className={classes.button} to="/completeProfile">Click Here</NavLink>
      </div>
      <button className={classes.button} onClick={verifyEmailHandler}>Verify Email</button>
    </div>
  );
};

export default WelcomePage;

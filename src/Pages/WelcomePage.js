import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div>
      <div className={classes.section}>
        <h2 className={classes.title}>Welcome To Expense Tracker</h2>
      </div>
      <div className={classes.section}>
        To Complete Your Profile
        <NavLink className={classes.button} to="/completeProfile">Click Here</NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;

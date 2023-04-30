import React from "react";
import { NavLink } from "react-router-dom";



const WelcomePage = () => {
  return (
    <div>
      <h2>Welcome To Expense Tracker</h2>
      <NavLink to="/signUp">Click here to Go to Sign Up Page</NavLink>
     
    </div>
  );
};

export default WelcomePage;
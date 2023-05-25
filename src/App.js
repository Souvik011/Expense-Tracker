import React  from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import ProfileComplete from "./Pages/ProfileComplete";
import WelcomePage from "./Pages/WelcomePage";
import Header from "./Header/Header";

import Expenses from "./Pages/Expenses/Expenses";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  
  return (
    <React.Fragment>
      <Header/>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Expenses />} />
        ) : (
          <Route path="/" element={<SignupPage />} />
        )}

        <Route path="/signUp" element={<SignupPage />} />

        <Route path="/forgotPass" element={<ForgotPassword />} />

        {isLoggedIn ? (
          <Route path="/LogIn" element={<WelcomePage />} />
        ) : (
          <Route path="/LogIn" element={<LogInPage />} />
        )}

        {isLoggedIn ? (
          <Route path="/expenses" element={<Expenses />} />
        ) : (
          <Route path="/expenses" element={<LogInPage />} />
        )}

        {isLoggedIn ? (
          <Route path="/completeProfile" element={<ProfileComplete />} />
        ) : (
          <Route path="/completeProfile" element={<LogInPage />} />
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;

import React, { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import SignupPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import ProfileComplete from "./Pages/ProfileComplete";
import Header from "./Header/Header";
import LoginContext from "./Context/Login-Context";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const Ctx = useContext(LoginContext);
  console.log(Ctx.isLoggedIn);
  return (
    <React.Fragment>
      <Header />
      <Routes>
        {Ctx.isLoggedIn ? (
          <Route path="/" element={<WelcomePage />} />
        ) : (
          <Route path="/" element={<SignupPage />} />
        )}

        <Route path="/signUp" element={<SignupPage />} />

        <Route path="/forgotPass" element={<ForgotPassword />} />

        {Ctx.isLoggedIn ? (
          <Route path="/LogIn" element={<WelcomePage />} />
        ) : (
          <Route path="/LogIn" element={<LogInPage />} />
        )}

        {Ctx.isLoggedIn ? (
          <Route path="/completeProfile" element={<ProfileComplete />} />
        ) : (
          <Route path="/completeProfile" element={<LogInPage />} />
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../store/Auth";
import {themeActions} from "../store/Theme";


const Header = () => {
  const [premiumButton, setPremiumButton] = useState(true);
  const [premiumAccount, setPremiumAccount] = useState(false);
  const expenseAmount = useSelector(state => state.expense.expenseAmount);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  console.log(expenses);
  
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
  };
  console.log(expenses);
  const activatePremiumAccount = () => {
    setPremiumButton(false);
    setPremiumAccount(true);
    
    
  };

  const darkModeActivation = () => {
    dispatch(themeActions.switchTheme());

  };

  const normalModeActivation = () => {
    dispatch(themeActions.restoreTheme());
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const doc = document.createElement("doc");
    doc.download = fileName;
    doc.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    doc.dispatchEvent(clickEvt);
    doc.remove();
  };

  const downloadExpenses = () => {
    let headers = ["Money,Description,Category"];

    let usersCsv = expenses.reduce((acc, user) => {
      const { money, description, category } = user;
      acc.push([money, description, category].join(","));
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: "expenses.csv",
      fileType: "text/csv",
    });
  };

  return (
    <header className={classes.Header}>
      <div>
        <h3>Expense Tracker</h3>
      </div>
      {!isLoggedIn && <Link to="/signUp">Sign Up</Link>}
      {!isLoggedIn && <Link to="/LogIn">Log In</Link>}
      {!!isLoggedIn && <Link to="/expenses">Expenses</Link>}
      {isLoggedIn && (
        <Link onClick={logoutHandler} to="/LogIn">
          Log out
        </Link>
      )}
       {!!isLoggedIn && expenseAmount > 1000 && premiumButton && (
        <button onClick={activatePremiumAccount}>Premium Account</button>
      )}
      {!!isLoggedIn && premiumAccount && expenseAmount > 1000 && !premiumButton && (
        <button onClick={darkModeActivation}>Premium Mode</button>
      )}
      {!!isLoggedIn && premiumAccount && expenseAmount < 1000 && (
        <button onClick={normalModeActivation}>Normal Mode</button>
      )}
      {!!isLoggedIn && premiumAccount && expenseAmount > 1000 && (
        <button onClick={downloadExpenses}>Download Expenses</button>
      )}
    </header>
  );
};
export default Header;
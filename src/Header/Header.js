import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../store/Auth";
import {themeActions} from "../store/Theme";
import { expenseActions } from "../store/ExpenseReducer";


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

  const visibaleCartHandler = () => {
    dispatch(expenseActions.toggle());
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
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
      {!isLoggedIn && <Link to="/signUp"><button style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Sign Up</button></Link>}
      {!isLoggedIn && <Link to="/LogIn"><button style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Log In</button></Link>}
      {!!isLoggedIn && <Link to="/expenses"><button style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Expenses</button></Link>}
      {isLoggedIn && (
        <Link onClick={logoutHandler} to="/LogIn">
          <button style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Log out</button>
        </Link>
      )}
       {!!isLoggedIn && expenseAmount > 10000 && premiumButton && (
        <button onClick={activatePremiumAccount} style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Premium Account</button>
      )}
      {!!isLoggedIn && premiumAccount && expenseAmount > 10000 && !premiumButton && (
        <button onClick={darkModeActivation} style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Premium Mode</button>
      )}
      {!!isLoggedIn && !premiumAccount && expenseAmount < 10000 && (
        <button onClick={normalModeActivation} style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"fantasy"}}>Normal Mode</button>
      )}
      {!!isLoggedIn && premiumAccount && expenseAmount > 10000 && (
        <button onClick={downloadExpenses} style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"cursive"}}>Download Expenses</button>
      )}
      {!!isLoggedIn  && (
        <button onClick={visibaleCartHandler} style={{color:"blue",backgroundColor:"white",fontSize:"large",fontFamily:"sans-serif"}}>My Cart</button>
      )}
    </header>
  );
};
export default Header;
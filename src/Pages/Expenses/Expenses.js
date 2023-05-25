import React, { useRef,useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import classes from './Expenses.module.css';
import { getExpenseFetching, addExpenseFetching,deleteExpenseFetching,editExpenseFetching } from "../../store/expense-actions";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expenseItem = useSelector(state => state.expense.expenses);
  const isVisibale = useSelector((state) => state.expense.isVisibale);
  const theme = useSelector(state => state.theme.theme);
  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");
  const emailId = useSelector((state) => state.auth.email);
  const email = emailId.replace(/[@.]/g, "", "");
  
  const saveHandler=(newexpense)=>{
    dispatch(editExpenseFetching(newexpense,email));
  };
  const deleteHandler=(id)=>{
    
     dispatch(deleteExpenseFetching(id,email));
    
  };

  
  const addExpenseHandler = (event) => {
    event.preventDefault();
    const ExpenseItem = {
      money: moneyRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };
    dispatch(addExpenseFetching(ExpenseItem,email));
     
  };

  useEffect(()=> {
    dispatch(getExpenseFetching(email));
  },[email,dispatch])

  
 

  return (
    <React.Fragment >
      <div className={classes[`${theme}`]}>
      <h2 >Expenses Page...</h2>
      <Form onSubmit={addExpenseHandler} className={classes.Expenses}>
        <div>
          <label htmlFor="moneyId">Money Spent   :  </label>
          <input id="moneyId" type="number" ref={moneyRef}></input>
        </div>
        <div>
          <label htmlFor="descId">Description  :  </label>
          <input id="descId" type="text" ref={descRef}></input>
        </div>
        <div htmlFor="categoryId"> Category  :  
          <select id="categoryId" ref={categoryRef}>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Fuel">Fuel</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button>Add Expense</button>
      </Form>
      {isVisibale && <ExpenseItem expenseItem={expenseItem} onDelete={deleteHandler} onEdit={saveHandler}/> }
      {!isVisibale && <h2>Make Sure Your Cart is Visible </h2>}
      </div>
    </React.Fragment>
  );
};

export default Expenses;
import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import {expenseActions} from "../../store/ExpenseReducer";
import axios from "axios";
import classes from './Expenses.module.css';

const Expenses = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");
  const [expenseItem, setExpenseItem] = useState([]);

  const saveHandler=(newexpense)=>{

    axios.put(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses/${newexpense.id}.json`,newexpense)
    .then(
      (res)=>{
        setExpenseItem((prevExpenses)=>{
          const index=prevExpenses.findIndex((expense)=>expense.id===newexpense.id)

          const updatedExpense=[...prevExpenses];
          updatedExpense[index]=newexpense;
          dispatch(expenseActions.editExpense(updatedExpense));
          return updatedExpense
        })

      }
    ).catch((err)=>{
      console.log(err)
    })
  };
  const deleteHandler=(id)=>{
    axios.get(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses/${id}.json`).then((res)=> {
      dispatch(expenseActions.deleteExpense({desc:res.data.description,money:res.data.money}));
    }).catch((err)=>{
      console.log(err);
    });
    axios.delete(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses/${id}.json`).then((res)=>{
      setExpenseItem((prevExpenses)=>{
        return prevExpenses.filter((expense)=>expense.id !== id);
      })
    })
    
  };

  useEffect(()=> {
    axios.get(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses.json`)
    .then((res) => {
      let Expenses = [];
      for (let key in res.data) {
        Expenses.push({ id: key, ...res.data[key] });
      }
      setExpenseItem(Expenses);
      dispatch(expenseActions.addExpense(Expenses));
      
    })
    .catch((err) => {
      console.log(err);
    });
    
  },[]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const ExpenseItem = {
      money: moneyRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };
    dispatch(expenseActions.addExpense(ExpenseItem.money));
    axios.post(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses.json`,ExpenseItem)
    .then((res) => {
      setExpenseItem((prevItem) => {
        return [...prevItem, { id: res.data.name, ...ExpenseItem}];
      });
    })
    .catch((err) => {
      console.log(err);
    });
    
    
  };
 

  return (
    <React.Fragment >
      <div className={classes[`${theme}`]}>
      <h2 >Expenses Page...</h2>
      <Form onSubmit={addExpenseHandler} className={classes.Expenses}>
        <div>
          <label htmlFor="moneyId">Money Spent</label>
          <input id="moneyId" type="number" ref={moneyRef}></input>
        </div>
        <div>
          <label htmlFor="descId">Description</label>
          <input id="descId" type="text" ref={descRef}></input>
        </div>
        <div htmlFor="categoryId">
          <select id="categoryId" ref={categoryRef}>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Fuel">Fuel</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button>Add Expense</button>
      </Form>
      <ExpenseItem expenseItem={expenseItem} onDelete={deleteHandler} onEdit={saveHandler}/>
      </div>
    </React.Fragment>
  );
};

export default Expenses;
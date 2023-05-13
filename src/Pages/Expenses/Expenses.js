import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import axios from "axios";

const Expenses = () => {
  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");
  const [expenseItem, setExpenseItem] = useState([]);

  useEffect(()=> {
    axios.get(`https://expense-tracker-5ef39-default-rtdb.firebaseio.com/Expenses.json`)
    .then((res) => {
      let Expenses = [];
      for (let key in res.data) {
        Expenses.push({ id: key, ...res.data[key] });
      }
      setExpenseItem(Expenses);
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
      <h2 >Expenses Page...</h2>
      <Form onSubmit={addExpenseHandler} >
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
      <ExpenseItem expenseItem={expenseItem} />
    </React.Fragment>
  );
};

export default Expenses;
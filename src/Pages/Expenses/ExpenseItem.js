import React , { useState } from "react";
import classes from "./ExpenseItem.module.css";
import { Form } from "react-bootstrap";



const ExpenseItem = ({ expenseItem, onDelete ,onEdit}) => {
  const expense = expenseItem;
  console.log(expenseItem);

  const [editExpense, setEditExpense] = useState(null);


  const deleteHandler = (expenseItem) => {
    onDelete(expenseItem.id);
  };

  const editHandler = (expense) => {
    setEditExpense(expense);
  };

  const saveEditHandler = (updatedExpense) => {
    setEditExpense(null);
    onEdit(updatedExpense);
  };

  return (
    <React.Fragment>
      {!editExpense && (
        <ul className={classes.ExpenseItem}>
          {expense.map((expense) => (
            <li key={expense.id} >
              <div style={{fontSize:"large",backgroundColor:"orange",paddingRight:"4px"}}>{expense.description} </div>
              <div style={{fontSize:"medium",paddingRight:"8px"}}>{expense.category}</div>
              <div style={{fontSize:"large",backgroundColor:"yellow",color:"red",paddingRight:"4px"}}>$ {expense.money}</div>    
              <button style={{backgroundColor:"red" , color:"whitesmoke"}} onClick={() => deleteHandler(expense)}>
                Delete Expense
              </button>
              <button style={{backgroundColor:"green" , color:"whitesmoke"}} onClick={() => editHandler(expense)}>
                Edit Expense
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {editExpense && (
        <div className={classes.editExpense}>
          <Form onSubmit={(event) => {
            event.preventDefault();
            const updatedExpense = {
              ...editExpense,
              description: event.target.description.value,
              category: event.target.category.value,
              money: event.target.money.value,
            };
            saveEditHandler(updatedExpense);
          }}>
            <label>
              Description:
              <input type="text" name="description" defaultValue={editExpense.description} />
            </label>
            <label>
              Category:
             
              <select name="category" defaultValue={editExpense.category} >
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Fuel">Fuel</option>
            <option value="Other">Other</option>
          </select>
            </label>
            <label>
              Amount:
              <input type="number" name="money" defaultValue={editExpense.money} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditExpense(null)}>Cancel</button>
          </Form>
          
        </div>
      )}
    </React.Fragment>
  );
};

export default ExpenseItem;

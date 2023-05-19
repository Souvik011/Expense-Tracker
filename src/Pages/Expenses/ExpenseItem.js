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
              <div>{expense.description} </div>
              <div>{expense.category}</div>
              <div>${expense.money}</div>    
              <button onClick={() => deleteHandler(expense)}>
                Delete Expense
              </button>
              <button onClick={() => editHandler(expense)}>
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
              <input type="text" name="category" defaultValue={editExpense.category} />
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

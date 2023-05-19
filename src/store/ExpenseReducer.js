import { createSlice } from "@reduxjs/toolkit";

const initialExpenseSlice = { expenses: [] , expenseAmount: 0 };

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseSlice,
    reducers: {
        addExpense(state,action) {
            state.expenses = action.payload;
            let amount = +0;
            for(var i=0 ; i<action.payload.length;i++){
                amount = +amount + +action.payload[i].money;
            }
            state.expenseAmount = amount;
            
        },
        deleteExpense(state,action) {
            state.expenses.filter((expense) => expense.description !== action.payload.desc);
            state.expenseAmount = +state.expenseAmount - +action.payload.money;
            
            
        },
        editExpense(state,action) {
            state.expenses = action.payload;
            let amount = +0;
            for(var i=0 ; i<action.payload.length;i++){
                amount = +amount + +action.payload[i].money;
            }
            state.expenseAmount = amount; 
        }
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
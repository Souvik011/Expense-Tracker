import { createSlice } from "@reduxjs/toolkit";

const initialExpenseSlice = { expenses: [] , expenseAmount: 0 , isVisibale: false };

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseSlice,
    reducers: {
        addExpense: (state, action) => {
            state.expenses = action.payload.itemsArray;
            state.expenseAmount = action.payload.expensesAmount;
        },
        deleteExpense(state) {
            
        },
        editExpense(state) {
            
        },
        toggle(state) {
            state.isVisibale = !state.isVisibale;
        }
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
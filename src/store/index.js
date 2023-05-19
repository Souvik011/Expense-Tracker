import {configureStore} from "@reduxjs/toolkit";

import Auth from "./Auth";
import ExpenseReducer from "./ExpenseReducer";
import Theme from "./Theme";

const store = configureStore({
    reducer:{auth : Auth , expense: ExpenseReducer , theme:Theme}
});

export default store ; 
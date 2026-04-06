import { configureStore } from "@reduxjs/toolkit";
import inputsValueReducer from './reducers/inputsValueReducer';
import calendarChDays from './reducers/calendarChDays';

const store = configureStore({
    reducer: {
        inputsValueReducer,
        calendarChDays
    }
})

export default store;
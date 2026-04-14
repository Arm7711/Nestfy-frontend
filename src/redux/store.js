import { configureStore } from "@reduxjs/toolkit";
import inputsValueReducer from './reducers/inputsValueReducer';
import calendarChDays from './reducers/calendarChDays';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        inputsValueReducer,
        calendarChDays,
        authReducer
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import inputsValueReducer from './reducers/inputsValueReducer';
import calendarChDays from './reducers/calendarChDays';
import authReducer from './reducers/authReducer';
import layoutReducer from './reducers/layoutReducer';

const store = configureStore({
    reducer: {
        inputsValueReducer,
        calendarChDays,
        authReducer,
        layoutReducer
    }
})

export default store;
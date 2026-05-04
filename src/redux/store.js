import { configureStore } from "@reduxjs/toolkit";
import inputsValueReducer from './reducers/inputsValueReducer';
import calendarChDays from './reducers/calendarChDays';
import authReducer from './reducers/authReducer';
import layoutReducer from './reducers/layoutReducer';
import quantityReducer from './reducers/quantityReducer';

const store = configureStore({
    reducer: {
        inputsValueReducer,
        calendarChDays,
        authReducer,
        layoutReducer,
        quantityReducer
    }
})

export default store;
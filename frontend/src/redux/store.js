import { configureStore } from "@reduxjs/toolkit";
import inputsValueReducer from './reducers/inputsValueReducer';

const store = configureStore({
    reducer: {
        inputsValueReducer
    }
})

export default store;
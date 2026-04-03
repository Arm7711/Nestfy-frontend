import { createSlice } from '@reduxjs/toolkit';

const inputsValue = createSlice({
    name: 'inputsValue',
    initialState: {
        authInputValue:''
    },
    reducers: {
        setAuthInputValue: (state,{payload}) => {
            state.authInputValue = payload;
        }
    },
});

export const {setAuthInputValue} = inputsValue.actions;
export default inputsValue.reducer;

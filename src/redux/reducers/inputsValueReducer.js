import { createSlice } from '@reduxjs/toolkit';

const inputsValue = createSlice({
    name: 'inputsValue',
    initialState: {
        authInputValue: '',
        sendCodeInputValue: '',
    },
    reducers: {
        setAuthInputValue: (state, { payload }) => {
            state.authInputValue = payload;
        },
        setSendCodeInputValue: (state, { payload }) => {
            state.sendCodeInputValue = payload;
        }
    },
});

export const { setAuthInputValue,setSendCodeInputValue } = inputsValue.actions;
export default inputsValue.reducer;

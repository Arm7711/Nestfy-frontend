import { createSlice } from '@reduxjs/toolkit';

const quantityReducer = createSlice({
    name: 'quantityReducer',
    initialState: {
        quantity: {},
    },
    reducers: {
        setQuanity: (state, { payload }) => {
            state.quantity = payload;
        },
    },
});

export const { setQuanity } = quantityReducer.actions;
export default quantityReducer.reducer;

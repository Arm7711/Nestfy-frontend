import { createSlice } from '@reduxjs/toolkit';

const layoutReducer = createSlice({
    name: 'layoutReducer',
    initialState: {
        headerClasses: {},
    },
    reducers: {
        setHeaderClasses: (state, { payload }) => {
            state.headerClasses = payload;
        },
    },
});

export const { setHeaderClasses } = layoutReducer.actions;
export default layoutReducer.reducer;

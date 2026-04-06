import { createSlice } from '@reduxjs/toolkit';

const calendarDays = createSlice({
    name: 'calendarDays',
    initialState: {
        selectedDays: '',

    },
    reducers: {
        setSelectedDays: (state, { payload }) => {
            state.selectedDays = payload;
        },
    },
});

export const { setSelectedDays } = calendarDays.actions;
export default calendarDays.reducer;

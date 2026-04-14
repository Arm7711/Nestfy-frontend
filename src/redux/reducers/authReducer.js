import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "loading",
    user: null,
    accessToken: null,
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.status = "auth";
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },

        setGuest(state) {
            state.status = "guest";
            state.user = null;
            state.accessToken = null;
        },

        setLoading(state) {
            state.status = "loading";
        },

        setToken(state, action) {
            state.status = "auth"; 
            state.accessToken = action.payload;
        },
    },
});

export const {
    setAuth,
    setGuest,
    setLoading,
    setToken,
} = authReducer.actions;

export default authReducer.reducer;
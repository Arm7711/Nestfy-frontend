import Api from "../api/Api";
import store from "../redux/store";
import { setLoading, setGuest } from "../redux/reducers/authReducer";

let initialized = false;

export const bootstrapAuth = async () => {
    if (initialized) return;
    initialized = true;

    store.dispatch(setLoading());
    await Api.initAuth();
};
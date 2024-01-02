import {configureStore, combineReducers} from "@reduxjs/toolkit";
import modalSlice from "../slice/modaSlice";
import AuthReducer from "../slice/AuthSlice";

const rootReducer = combineReducers({
	modal: modalSlice,
	auth: AuthReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
	reducer: rootReducer
});

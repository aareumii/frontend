import {configureStore, combineReducers} from "@reduxjs/toolkit";
import modalSlice from "../slice/modaSlice";

const rootReducer = combineReducers({
	modal: modalSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
	reducer: rootReducer
});

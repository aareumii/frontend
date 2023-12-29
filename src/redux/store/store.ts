import {configureStore, combineReducers} from "@reduxjs/toolkit";
import AuthReducer from "../slice/AuthSlice"; 

const rootReducer = combineReducers({
	auth: AuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
	reducer: rootReducer
});

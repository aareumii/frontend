import {createSlice} from "@reduxjs/toolkit"; 

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        loginSuccess : (state,action) =>{
            state.accessToken = action.payload.access_Token;
            state.refreshToken= action.payload.refresh_Token; 
        },
        logoutSuccess : (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const {loginSuccess,logoutSuccess } =AuthSlice.actions;
export default AuthSlice.reducer;
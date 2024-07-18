import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: localStorage.getItem("Users") !== null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        setLogin : (state) => {
            state.isLoggedin = true;
        },
        setLogout : (state) => {
            state.isLoggedin = false;
        }
    }
})

export const {setLogin, setLogout} = userSlice.actions;

export default userSlice.reducer;
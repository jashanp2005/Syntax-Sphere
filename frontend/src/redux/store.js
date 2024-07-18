import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootSlice'
import userReducer  from './userSlice'

export const store = configureStore({
    reducer: {
        root: rootReducer,
        user: userReducer,
    }
});
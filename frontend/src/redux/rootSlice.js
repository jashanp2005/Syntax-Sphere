import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    words: [],
    result: []
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        getWordsRequest: (state) => {
            state.loading = true; 
        },
        getWordsSuccess: (state, action) => { 
            state.loading = false;
            state.words = action.payload;     
        },
        getWordsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;  
        },
        saveResult: (state, action) => {
            state.loading = false;
            state.result = action.payload;
        },
        clearState: (state) => {
            state.loading = false;
            state.result = [];
            state.words = [];
            state.error = undefined;  
        },
    }
})

export const {getWordsRequest, getWordsSuccess, getWordsFail, saveResult, clearState} = rootSlice.actions;

export default rootSlice.reducer;
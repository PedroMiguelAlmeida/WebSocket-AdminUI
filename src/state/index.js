import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode:"dark",
    userid:"6457d9f73bf1aaaaa83cf503"
};

export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === 'light' ? "dark" : 'light';
        }
    }
})

export const {setMode} = globalSlice.actions;
export default globalSlice.reducer;
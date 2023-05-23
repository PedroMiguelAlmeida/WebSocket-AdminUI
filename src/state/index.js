import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode:"light",
    user:"null",
    token:"null"
};

export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === 'light' ? "dark" : 'light';
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state,action)=>{
            state.user=null;
            state.token=null;
        },
    }
})


export const {setMode,setLogin,setLogout} = globalSlice.actions;
export default globalSlice.reducer;

export const selectCurrentUser = (state) => state.global.user
export const selectCurrentToken = (state) => state.global.token
import { createSlice } from "@reduxjs/toolkit";
export const userSlice= createSlice({
    name:"user",
    initialState:{user:null,mobileVerified:false},
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        addVerification:(state,action)=>{
            state.mobileVerified=action.payload
        },
        logout:(state)=>{
            state.user=null;
        }

    }
})

export const {login,logout,addVerification} =userSlice.actions;

export const selectUser =(state) => state.user;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state,action) => {
         return {}
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
          },
          updateUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
          },
    },

});

export const {login, logout } = userSlice.actions;
export const { setUserData, updateUserData } = userSlice.actions;
export const userData1 = (state) => state.user;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user
            isAuthenticated: true
        },
        userloggedOut: (state) => {
            state.user = null,
                state.isAuthenticated = false
        }
    }
})


export const { userLoggedIn, userloggedOut } = authSlice.actions;


export default authSlice.reducer;
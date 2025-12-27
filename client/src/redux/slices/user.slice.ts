import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface User {
    fullname : string ,
    username : string ,
    userId : string ,
    profilePicture : string
}

const initialState = {
    authUser: {},
    selectedUser: {},
    onlineUsers: [],
    otherUsers: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<User>) => {
            state.authUser = action.payload;
        },
    }
})

export default userSlice.reducer;
export const { setAuth } = userSlice.actions;
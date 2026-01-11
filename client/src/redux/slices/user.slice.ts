import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface User {
  fullname?: string,
  username?: string,
  userId?: string,
  profilePicture?: string
}
export interface OtherUser {
  _id?: string,
  fullname?: string,
  username?: string,
  profilePicture?: string,
  gender?: string
}

export interface InitialStateInterface {
  authUser: User,
  selectedUser: OtherUser,
  onlineUsers: Array<OtherUser>,
  otherUsers: Array<OtherUser>
}

const initialState : InitialStateInterface = {
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
    setSelectedUser : (state , action) => {
      state.selectedUser = action.payload ;
    },
    setOtherUsers: (state , action) => {
      state.otherUsers = action.payload ;
    }
  }
})

export default userSlice.reducer;
export const { setAuth , setSelectedUser , setOtherUsers } = userSlice.actions;
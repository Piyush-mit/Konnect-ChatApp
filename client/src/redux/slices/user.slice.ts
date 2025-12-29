import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface User {
    fullname : string ,
    username : string ,
    userId : string ,
    profilePicture : string
}
const demoUsers = [
  {
    _id: "64f1a9c1a1b1c1d1e1f1a001",
    fullname: "John Doe",
    username: "johndoe",
    profilePicture: "https://ui-avatars.com/api/?name=John+Doe",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a002",
    fullname: "Jane Doe",
    username: "janedoe",
    profilePicture: "https://ui-avatars.com/api/?name=Jane+Doe",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a003",
    fullname: "Alex Kumar",
    username: "alexkumar",
    profilePicture: "https://ui-avatars.com/api/?name=Alex+Kumar",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a004",
    fullname: "Priya Sharma",
    username: "priya_sharma",
    profilePicture: "https://ui-avatars.com/api/?name=Priya+Sharma",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a005",
    fullname: "Rahul Verma",
    username: "rahulverma",
    profilePicture: "https://ui-avatars.com/api/?name=Rahul+Verma",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a006",
    fullname: "Neha Gupta",
    username: "neha_gupta",
    profilePicture: "https://ui-avatars.com/api/?name=Neha+Gupta",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a007",
    fullname: "Rohit Mehta",
    username: "rohitmehta",
    profilePicture: "https://ui-avatars.com/api/?name=Rohit+Mehta",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a008",
    fullname: "Ananya Roy",
    username: "ananya_roy",
    profilePicture: "https://ui-avatars.com/api/?name=Ananya+Roy",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a009",
    fullname: "Vikram Singh",
    username: "vikram_singh",
    profilePicture: "https://ui-avatars.com/api/?name=Vikram+Singh",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a010",
    fullname: "Kavya Nair",
    username: "kavya_nair",
    profilePicture: "https://ui-avatars.com/api/?name=Kavya+Nair",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a011",
    fullname: "Arjun Patel",
    username: "arjunpatel",
    profilePicture: "https://ui-avatars.com/api/?name=Arjun+Patel",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a012",
    fullname: "Meera Jain",
    username: "meera_jain",
    profilePicture: "https://ui-avatars.com/api/?name=Meera+Jain",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a013",
    fullname: "Siddharth",
    username: "siddharth",
    profilePicture: "https://ui-avatars.com/api/?name=Siddharth",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a014",
    fullname: "Pooja Kulkarni",
    username: "pooja_kulkarni",
    profilePicture: "https://ui-avatars.com/api/?name=Pooja+Kulkarni",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a015",
    fullname: "Aman Khan",
    username: "aman_khan",
    profilePicture: "https://ui-avatars.com/api/?name=Aman+Khan",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a016",
    fullname: "Sneha Malhotra",
    username: "sneha_malhotra",
    profilePicture: "https://ui-avatars.com/api/?name=Sneha+Malhotra",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a017",
    fullname: "Karan Bhatia",
    username: "karan_bhatia",
    profilePicture: "https://ui-avatars.com/api/?name=Karan+Bhatia",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a018",
    fullname: "Isha Saxena",
    username: "isha_saxena",
    profilePicture: "https://ui-avatars.com/api/?name=Isha+Saxena",
    gender: "female",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a019",
    fullname: "Manoj Yadav",
    username: "manoj_yadav",
    profilePicture: "https://ui-avatars.com/api/?name=Manoj+Yadav",
    gender: "male",
  },
  {
    _id: "64f1a9c1a1b1c1d1e1f1a020",
    fullname: "Ritika Singh",
    username: "ritika_singh",
    profilePicture: "https://ui-avatars.com/api/?name=Ritika+Singh",
    gender: "female",
  },
];




const initialState = {
    authUser: {},
    selectedUser: {},
    onlineUsers: [],
    otherUsers: demoUsers
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
import { setMessages, setSelectedUser, type OtherUser } from "@/redux/slices/user.slice";
import { ItemDescription, ItemTitle } from "./ui/item";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/api";
import toast from "react-hot-toast";
import type { StateType } from "@/redux/store";

function UserCard(props: { info: OtherUser }) {

    const { info: user } = props;
    const dispatch = useDispatch();
    const currentUser = useSelector((state:StateType)=>state.userReducer.selectedUser);
    const onlineUsers = useSelector((state:StateType)=>state.userReducer.onlineUsers);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/message/${user._id}`);
            dispatch(setMessages(res.data.chat.messages));
        } catch (error: any) {
            if(error?.response?.data?.message === "Chat not found") return ;
            toast.error(error?.response?.data?.message || "Failed to load chat");
        }
    }

    const handleClick = () => {
        dispatch(setSelectedUser(user));
        dispatch(setMessages([]));
        fetchMessages();
    }

    return (
        <div className={`flex hover:bg-white/5 px-3 rounded-lg py-2 ${user._id == currentUser._id ? "bg-white/10" : ""}`} onClick={handleClick}>

            {/* Avatar */}
            <div className="relative w-11 h-11 rounded-full flex content-center">
                <img src={user.profilePicture} className="rounded-full object-cover" />
                <span className={`absolute h-2.5 w-2.5 right-0.5 top-0.5 rounded-full border-2 bg-green-500 border-white ${onlineUsers.includes(user._id!) ? "" : "hidden"}`}></span>
            </div>

            {/* Username */}
            <div className="flex flex-col justify-center pl-3">
                <ItemTitle>{user.fullname}</ItemTitle>
                <ItemDescription>
                    {"@" + user.username}
                </ItemDescription>
            </div>

        </div >
    )
}

export default UserCard;
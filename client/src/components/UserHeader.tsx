import { type OtherUser } from "@/redux/slices/user.slice";
import { ItemDescription, ItemTitle } from "./ui/item";
import type { StateType } from "@/redux/store";
import { useSelector } from "react-redux";

function UserHeader(props: { info: OtherUser }) {

    const { info: user } = props;
    const onlineUsers = useSelector((state:StateType)=>state.userReducer.onlineUsers);

    return (
        <div className="flex px-3 rounded-lg py-2">

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

export default UserHeader;
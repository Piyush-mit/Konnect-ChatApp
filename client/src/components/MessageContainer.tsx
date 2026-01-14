import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import UserHeader from "./UserHeader";
import { ScrollArea } from "./ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import { setSelectedUser } from "@/redux/slices/user.slice";
export default function MessageContainer() {
    const receiver = useSelector((state: StateType) => state.userReducer.selectedUser);
    const { username, profilePicture, userId } = useSelector((state: StateType) => state.userReducer.authUser);
    const messages = useSelector((state: StateType) => state.userReducer.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser({}));
        }
    }, []);
    return (
        <div className="flex-1 ">
            {receiver.username ?
                <div className="w-full h-full relative">

                    {/* User section */}
                    <div className="border-b">
                        <UserHeader info={receiver} />
                    </div>

                    {/* Messages section */}
                    <ScrollArea className="h-[82%] w-full pl-3 pr-4 pb-1">
                        {
                            messages?.map((mess) => <MessageBubble
                                key={mess._id}
                                fromOtherSide={mess.senderId != receiver._id}
                                avatar={mess.senderId == userId ? profilePicture : receiver.profilePicture}
                                username={mess.senderId == userId ? username : receiver.username}
                                message={mess.message}
                                time={mess.createdAt}
                            />
                            )
                        }
                    </ScrollArea>
                    {/* Text area */}
                    <MessageInput />

                </div>
                :
                <div className="w-full h-full flex items-center justify-center">
                    <div className="font-semibold text-3xl relative bottom-3 text-gray-400 select-none">Welcome to Konnect</div>
                </div>
            }
        </div>
    )
}
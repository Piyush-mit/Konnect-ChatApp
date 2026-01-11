import { useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import UserHeader from "./UserHeader";
import { Button } from "./ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

export default function MessageContainer() {
    const reciever = useSelector((state: StateType) => state.userReducer.selectedUser);
    const sender = useSelector((state: StateType) => state.userReducer.authUser);
    return (
        <div className="flex-1 ">
            {reciever.username ?
                <div className="w-full h-full relative">

                    {/* User section */}
                    <div className="border-b">
                        <UserHeader info={reciever} />
                    </div>

                    {/* Messages section */}
                    <ScrollArea className="h-[82%] w-full pl-3 pr-4">
                        <MessageBubble fromOtherSide={true} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={false} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={true} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={false} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={true} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={false} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={true} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={false} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={true} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                        <MessageBubble fromOtherSide={false} avatar={sender.profilePicture} username={sender.username} message="Hello world "/>
                    </ScrollArea>
                    {/* Text area */}
                    <div className="flex px-2 gap-1 w-full">
                        <Input className="focus:border-0 border-none focus-visible:ring-0 h-16 rounded-full px-6 " placeholder="Type a message"></Input>
                        <Button variant={"secondary"} className="h-16 w-16 rounded-full"><SendHorizonalIcon /></Button>
                    </div>

                </div>
                :
                <div className="w-full h-full flex items-center justify-center">
                    <div className="font-semibold text-3xl relative bottom-3 text-gray-400 select-none">Welcome to Konnect</div>
                </div>
            }
        </div>
    )
}
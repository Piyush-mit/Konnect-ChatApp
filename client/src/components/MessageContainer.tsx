import { useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import UserHeader from "./UserHeader";
import { Button } from "./ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export default function MessageContainer() {
    const user = useSelector((state: StateType) => state.userReducer.selectedUser);


    return (
        <div className="flex-1 ">
            {user.username ?
                <div className="w-full h-full flex flex-col">
                    {/* User section */}
                    <div className="border-b">
                        <UserHeader info={user} />
                    </div>
                    {/* Messages section */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 ">
                            <ScrollArea className="h-full w-full">

                            </ScrollArea>
                        </div>
                        {/* Text area */}
                        <div className="flex px-2 gap-1">
                            <Input className="focus:border-0 border-none focus-visible:ring-0 h-16 rounded-full px-6" placeholder="Type a message"></Input>
                            <Button variant={"secondary"} className="h-16 w-16 rounded-full"><SendHorizonalIcon/></Button>
                        </div>
                    </div>
                </div>
                :
                <div className="w-full h-full flex items-center justify-center">
                    <div className="font-semibold text-3xl relative bottom-3 text-gray-400">Welcome to Konnect</div>
                </div>
            }
        </div>
    )
}
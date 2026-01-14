import { SendHorizonalIcon } from "lucide-react";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { useState } from "react";
import { api } from "@/api";
import type { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "@/redux/slices/user.slice";
import { Spinner } from "./ui/spinner";

function MessageInput() {
    const [text , setText] = useState("");
    const receiver = useSelector((state: StateType) => state.userReducer.selectedUser);
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const messages = useSelector((state: StateType) => state.userReducer.messages);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if(!text) return ;
            const res = await api.post(`/message/send/${receiver._id}`,{message : text});
            if(messages){
                dispatch(setMessages([...messages , res.data.newMessage]))
            }else{
                dispatch(setMessages([res.data.newMessage]))
            }
            // fetchMessages();
        } catch (error:any) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setText("");
            setLoading(false);
        }
    }

    return (
        <div className="flex px-2 gap-1 w-full">
            <Input className="focus:border-0 border-none focus-visible:ring-0 h-16 rounded-full px-6 " placeholder="Type a message" onChange={(e)=>setText(e.target.value)} value={text} onKeyDown={(e)=>{
                if(e.key == "Enter"){
                    e.preventDefault();
                    handleSubmit() ;
                }
            }}></Input>
            <Button variant={"secondary"} className="h-16 w-16 rounded-full" onClick={handleSubmit} disabled={loading}>{!loading ? <SendHorizonalIcon /> : <Spinner/>}</Button>
        </div>
    )
}

export default MessageInput ;
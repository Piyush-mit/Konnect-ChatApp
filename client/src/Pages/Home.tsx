import { api } from "@/api";
import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";
import { setAuth, setMessages, setOnlineUsers } from "@/redux/slices/user.slice";
import type { StateType } from "@/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { io, type Socket } from "socket.io-client";

export default function Home() {
    const { authUser } = useSelector((state: StateType) => state.userReducer);
    const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const [socket, setSocket] = useState<Socket | null>(null)
    const dispatch = useDispatch();
    const existingMessages = useSelector((state:StateType)=>state.userReducer.messages)

    const fetchCurrentUser = async () => {
        try {
            const res = await api.get("/user/me");
            if (res.status == 200) {
                const { fullname, username, _id: userId, profilePicture } = res.data.user;
                dispatch(setAuth({ fullname, userId, profilePicture, username }));
            } else throw new Error("Fetch failed");
        } catch (error) {
            toast.error("Authentication failed");
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);
    
    useEffect(() => {
        const socketInstance = io(backendURL, {
            withCredentials: true,
            auth: {
                userId: authUser.userId,
            },
        });
        setSocket(socketInstance);
        const handleOnlineUsers = (onlineUsers: string[]) => {
            dispatch(setOnlineUsers(onlineUsers))
        }
        socketInstance.on('getOnlineUsers', handleOnlineUsers);

        socketInstance.on('newMessage', (newMessage) => {
            if(existingMessages){
                dispatch(setMessages([...existingMessages , newMessage]));
            }else{
                dispatch(setMessages([newMessage]));
            }
        })

        // cleanup
        return () => {
            socketInstance.disconnect();
            dispatch(setOnlineUsers([]));
            setSocket(null);
        };

    }, [existingMessages]);

    return (
        <div className="flex h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] w-screen overflow-hidden">
            <SideBar />
            <MessageContainer />
        </div>
    )
}
